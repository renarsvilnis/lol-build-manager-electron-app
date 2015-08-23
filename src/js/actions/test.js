/**
 * For documentation reference stores/file.js
 */

var Dispatcher = require('../dispatchers/app');

var fileActions = {

  // ########################################
  // Transmiting file
  // ########################################
  onFileAdd: function(id, file) {
    Dispatcher.handleViewAction({
      type: 'onFileAdd',
      id: id,
      file: file,
    });
  },

  onIceCandidate: function(id, ice) {
    Dispatcher.handleViewAction({
      type: 'onIceCandidate',
      id: id,
      ice: ice
    });
  },

  // ########################################
  // NEW STUFF
  // ########################################
  onOffer: function(id, sdp, file) {
    Dispatcher.handleViewAction({
      type: 'onOffer',
      id: id,
      sdp: sdp,
      file: file
    });
  },

  onOfferResponse: function(status, id, sdp) {
    Dispatcher.handleViewAction({
      type: 'onOfferResponse',
      status: status,
      id: id,
      sdp: sdp
    });
  },

};

module.exports = fileActions;