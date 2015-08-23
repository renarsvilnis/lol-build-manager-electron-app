'use strict';

var assign       = require('object-assign');
var debug        = require('debug')('app:File');

var Dispatcher   = require('../dispatchers/app');
var EventEmitter = require('events').EventEmitter;

var config       = require('../config.js');
var ws           = require('./../modules/ws.js');

/**
 * Filetransfer peerConnection isntance
 */
var peerConnection = null;

/**
 * This appication currenlty only supports one way data travel so this variable represents either a in or out dataChannel
 */
var dataChannel = null;

/**
 * Either a file or and plain javascript object with file atributes such as name, type, size, ..
 */
var file;

var receivedBuffer = [],
    receivedBytes = 0;

var bytesProcessed = 0;
var bytesTotal = 0;
var bytesPrev = 0;

// var timestampPrev =  0;
// var timestampStart =  null;
// var statsInterval =  null;
// var bitrateMax =  0;

// var progressBytes =  0;
// var progressMaxBytes =  0;

var actionInProgress = false;


var FileStore = assign({}, EventEmitter.prototype, {

  /**
   * Flag that tells if upload or file process in progress
   * @type {Boolean}
   */
  actionInProgress: false,

});


var createPeerConnection = function(id) {
  peerConnection = new RTCPeerConnection(config.peerConnectionConfig, config.peerConnectionConstrains);
  peerConnection.onicecandidate = onIceCandidate.bind(undefined, id);
};

var saveFile = function() {
  var receivedBlob = new Blob(receivedBuffer);

  var a = document.createElement('a');
  a.href = URL.createObjectURL(receivedBlob);
  a.download = file.name;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.parentNode.removeChild(a);
};


var sendData = function() {
  var f = file;

  if(f.size === 0)
    return;

  console.log('Starting to transmit data');

  // TODO: maybe it goes somewhere else
  // reset variables
  bytesProcessed = 0;
  bytesTotal = f.size;
  bytesPrev = 0;

  timestampPrev = 0;
  bitrateMax = 0;

  /**
   * Writes about chucnking file
   * https://bloggeek.me/send-file-webrtc-data-api/
   * https://www.webrtc-experiment.com/docs/how-file-broadcast-works.html
   *
   * 16k chunk size now is the most optimal
   */
  var chunkSize = 16384;
  var sliceFile = function(offset) {

    // TODO: i think this method is not optimalfor large files as for each
    // files it creates the big file again, but need to test it

    var reader = new FileReader();
    reader.onload = (function() {
      return function(e) {

        // send chunk
        dataChannel.send(e.target.result);

        bytesProcessed = offset + e.target.result.byteLength;
        // console.log(bytesProcessed);


        // TODO: throle
        FileStore.emit('progress', bytesProcessed);

        if (bytesTotal > offset + e.target.result.byteLength) {
          window.setTimeout(sliceFile, 0, offset + chunkSize);
        } else {
          console.log('File sent');
          closeConnections();
        }
      };
    })(f);

    var slice = f.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(slice);
  };

  // start the chunking
  sliceFile(0);


  // var reader = new FileReader();
  // reader.onload = onReadAsDataURL;
  // var text;
  // function onReadAsDataURL(ev, text) {

  //      // on first invocation
  //     if(ev) {
  //       text = ev.target.result;
  //     }

  //     var chunk;

  //     // console.log(text.byteLength, bytesProcessed, chunk);

  //     if (text.byteLength > chunkSize) {

  //       chunk = text.slice(0, chunkSize);
  //       dataChannel.send(chunk);

  //       bytesProcessed += chunk.byteLength;
  //       // console.log(bytesProcessed);

  //       // FileStore.emit('progress', bytesProcessed);
  //     } else {
  //       chunk = text;
  //       dataChannel.send(chunk);

  //       console.log('File sent');
  //       closeConnections();
  //     }



  //     var remainingDataURL = text.slice(chunk.byteLength);

  //     if (remainingDataURL.byteLength) {
  //       setTimeout(function() {
  //         onReadAsDataURL(null, remainingDataURL);
  //       }, 0);
  //     }
  // }
  // reader.readAsArrayBuffer(f);

};

var closeConnections = function() {
  dataChannel.close();

  if(peerConnection && peerConnection.signalingState !== 'closed')
    peerConnection.close();
}

// ########################################
// EVENT LISTENERS
// ########################################
var onError = function(error) {
  console.log(error);
};

var onDescription = function(isCaller, clientId, description) {
  console.log('New RTC description for file transfer from ' + (isCaller ? 'host' : 'guest'));

  peerConnection.setLocalDescription(description, function() {
    var data = {};

    if(isCaller) {
      data = {
        type: 'sdpOffer',
        id: clientId,
        sdp: description,
        file: {
          name: file.name,
          lastModified: file.lastModified, 
          size: file.size,
          type: file.type
        }
      };
    } else {
      data = {
        type: 'sdpAnswer',
        status: true,
        id: clientId,
        sdp: description,
      };
    }

    ws.send(JSON.stringify(data));
  }, onError);  
  
};

var onIceCandidate = function(id, ev) {
  console.log('on ice candiadate');

  if(ev.candidate != null) {
    console.log('New ice candidate for file transfer');

    ws.send(JSON.stringify({
      type: 'fileIceCandidateAdd',
      ice: ev.candidate,
      id: id
    }));
  }
};



var onDataChannelChange = function(isCaller) {
  var readyState = dataChannel.readyState;

  console.log('filefransfer dataChannel state changed to: ' + readyState);

  // when dataChannel opens start sending file
  if(readyState === 'open') {

    FileStore.emit('start', file.name, file.size);

    if(isCaller) {
      sendData();  
    }
    
  } else if(readyState === 'closed') {
    if(isCaller) {
    } else {
      saveFile();
      closeConnections();
    }
  }

};

var onDataChannelMessage = function(ev) {
  // console.log('New dataChannel message', ev);

  var data = ev.data;

  // if(receivedBytes == 0)
    // FileStore.emit('start', file.name, file.size);

  receivedBuffer.push(data);
  receivedBytes += data.byteLength;

  // setTimeout(function() {
    FileStore.emit('progress', receivedBytes);  
  // }, 0);

  // TODO: emit progress
};


FileStore.dispatchToken = Dispatcher.register(function(payload) {

  var actions = {

    onFileAdd: function(payload) {
      var uploadFile = payload.action.file;
      var id = payload.action.id;

      // TODO: close peer connection if opened i guess
      // TODO: check if not in progress

      // start PeerConnection
      file = uploadFile;

      createPeerConnection(id);

      console.log('Setting up dataChannel');
      dataChannel = peerConnection.createDataChannel('sendDataChannel');
      dataChannel.onopen = onDataChannelChange.bind(undefined, true);
      dataChannel.onclose = onDataChannelChange.bind(undefined, true);

      peerConnection.createOffer(onDescription.bind(undefined, true, id), onError);
    },

    onOffer: function(payload) {
      var hostId = payload.action.id;
      var sdp = payload.action.sdp;

      // TODO: send dat to UI
      file = payload.action.file;

      console.log(hostId, 'Friend wants to share this file with you', file);

      // TODO: check if its possible to add offer

      // TODO: make it a modal or smth;
      var userAcceptsFile = true;

      if(userAcceptsFile) {

        // create peerConnection for current client and answer his offer
        createPeerConnection(hostId);
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp), function() {
          console.log('Filefransfer remote description set');
          peerConnection.createAnswer(onDescription.bind(undefined, false, hostId), onError);
        }, onError);

        // listen when recieve new dataChannel
        peerConnection.ondatachannel = function(ev) {
          console.log('New dataChannel recieved');
          dataChannel = ev.channel;
          dataChannel.binaryType = 'arraybuffer';

          // TODO: listen then channel closes to save file
          dataChannel.onopen = onDataChannelChange.bind(undefined, false);
          dataChannel.onclose = onDataChannelChange.bind(undefined, false);
          dataChannel.onmessage = onDataChannelMessage;
        };

      } else {
        // send back that user doesn't want that file
        ws.send(JSON.stringify({
          type: 'sdpAnswer',
          status: false,
          id: hostId,
          sdp: null,
        }));
      }
      
    },

    onOfferResponse: function(payload) {
      // TODO: validate id

      var clientId = payload.action.id;
      var status = payload.action.status;
      var sdp = payload.action.sdp;

      if(status) {
        console.log('Destination client accepted file sending');
        console.log(clientId, status, sdp);
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp), function() {
          console.log('Filefransfer remote description set');
        }, onError);

      } else {
        // TODO: show in UI that user didn't want to share files
        console.log('Destination client didn\'t accepted your file request');
      }

    },

    onIceCandidate: function(payload) {

      // if(!peerConnection)
      //   return;

      // TODO: validate id
      
      console.log('New ice candidate from sender for file transfer', payload.action.ice);
      peerConnection.addIceCandidate(new RTCIceCandidate(payload.action.ice));
    }

  };

  actions[payload.action.type] && actions[payload.action.type](payload);
});

module.exports = FileStore;