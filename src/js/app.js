'use strict';

// https://github.com/facebook/react-devtools/issues/91
Object.defineProperty(
  window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
    value: {
      inject: function(runtime){ this._reactRuntime = runtime },
      getSelectedInstance: null,
      Overlay: null,
    }
  }
)

require('../bower_components/color-thief/dist/color-thief.min.js');

import React from 'react';

import Sidebar from './partials/sidebar.js';
import Body from './partials/body.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    var bookmarks = this.props.bookmarks[0].children;

    // On app opening subTree view is equal to sidebar
    this.state = {
      bookmarks,
      subTree: bookmarks
    };
  }

  // on sidebar folder select
  handleSelect(id) {

    chrome.bookmarks.getChildren(id, (subTree) => {
      this.setState({subTree});
    });
  }

  render() {

    return (
      <div id="bkm">
        <Sidebar
          onSelect={this.handleSelect.bind(this)}
          bookmarks={this.state.bookmarks} />
        <Body
          bookmarks={this.state.subTree} />
      </div>
    );
  }
}


// ########################################
// INIT
// ########################################
var Bookmarks = {

  tree: [],

  init: function() {

    // get chrome tree
    chrome.bookmarks.getTree((tree) => {

      // selecting first childrean instead of goign from top
      // that.tree = tree[0].children;
      this.tree = tree;

      var appEl = (<App bookmarks={this.tree} subTree={[]} />);

      React.render(
        appEl,
        document.body
      );

    });
  },

};


Bookmarks.init();

// document.addEventListener("contextmenu", function(e){
//   e.preventDefault();
// }, false);