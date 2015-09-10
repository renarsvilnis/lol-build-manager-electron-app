'use strict';

import React from 'react';

let SidebarGuide = React.createClass({

  render: function() {
    let builds = createNodeList(this.props.item.builds);

    return (
      <div className="c_builds-champion__guide">
        {this.prop.item.name}
      </div>
    );
  }
});

let SidebarBuild = React.createClass({
  render: function() {
    return (
      <div className="c_builds-champion__build">
        {this.props.item.title}
      </div>
    );
  }
});

let createNodeList = function(data) {
  let list = [];

  data.map((item) => {
    if(item.url) {
      list.push(<SidebarGuide key={item.id} item={item} />);
    } else {
      list.push(<SidebarBuild key={item.id} item={item} />);
    }
  });

  return list;
};

let SidebarChampion = React.createClass({

  render: function() {
    let nodes = createNodeList(this.props.group.data);

    return (
      <div className="c_builds-champion">
        <h4 className="c_builds-champion__header">
          <img
            className="c_builds-champion__avatar"
            src={this.props.group.image}
            alt="" />
          {this.props.group.name}
        </h4>
        <div className="c_builds-champion__sets">
          {nodes}
        </div>
      </div>
    );
  }
});

export default SidebarChampion;