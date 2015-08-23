'use strict';

// vendor modules
var React = require('react/addons');

// local modules
var InternalMessageReciever = require('../modules/internalMessageReciever.js');

// flux stuff
var FileStore               = require('../stores/file.js');
var fileActions             = require('../actions/file.js');

// react compontents
var ReactTransitionGroup    = React.addons.TransitionGroup;

var Client = React.createClass({

  // ########################################
  // DOM events
  // ########################################
  onLocalClientClick: function(id) {
    // if(!this.state.auth)
    //   return;

    // FileStore.beginTransfer(id);
  },

  onLocalClientDragOver: function(ev) {
    // if(!this.state.auth)
    //   return;

    var target = ev.currentTarget.parentNode;
    target.classList.add(target.classList[0] + '--hover');

    ev.stopPropagation();
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';
  },

  onLocalClientDragLeave: function(ev) {
    // if(!this.state.auth)
    //   return;

    var target = ev.currentTarget.parentNode;
    target.classList.remove(target.classList[0] + '--hover');

    ev.dataTransfer.dropEffect = 'none';
  },

  onLocalClientFileSelect: function(id, ev) {
    // if(!this.state.auth)
    //   return;

    ev.stopPropagation();
    ev.preventDefault();

    // FileList object
    var files = ev.dataTransfer.files; 

    // Currently supports one file transfers
    fileActions.onFileAdd(id, files[0]);
  },

  render: function() {
    var data = this.props.data;

    // return (
    //   <ReactTransitionGroup
    //     component="div"
    //     transitionName="example"
    //     transitionAppear={true}
    //     className="c-client"
    //     >
    //     <div
    //       className="c-client__circle"
    //       onClick={this.onLocalClientClick.bind(this, data.id)}
    //       onDrop={this.onLocalClientFileSelect.bind(this, data.id)}
    //       onDragOver={this.onLocalClientDragOver}
    //       onDragLeave={this.onLocalClientDragLeave}
    //       ></div>
    //     <div className="c-client__info">
    //       <div className="c-client__username">{data.id}</div>
    //       <div className="c-client__ip">{data.ip}</div>
    //     </div>
    //   </ReactTransitionGroup>
    // );

    return (
      <div
        className="c-client"
        >
        <div
          className="c-client__circle"
          onClick={this.onLocalClientClick.bind(this, data.id)}
          onDrop={this.onLocalClientFileSelect.bind(this, data.id)}
          onDragOver={this.onLocalClientDragOver}
          onDragLeave={this.onLocalClientDragLeave}
          ></div>
        <div className="c-client__info">
          <div className="c-client__username">{data.id}</div>
          <div className="c-client__ip">{data.ip}</div>
        </div>
      </div>
    );
  }

});

module.exports = Client;