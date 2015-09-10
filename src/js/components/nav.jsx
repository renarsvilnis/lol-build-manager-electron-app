'use strict';

import React from 'react';
import Router from 'react-router';

let Link = Router.Link;

let NavItem = React.createClass({

  render: function() {
    return (
      <Link
        className="c_nav__item"
        to={this.props.to}>
        {this.props.children}
      </Link>
    )
  }
});

let Nav = React.createClass({

  componentDidMount: function() {
  },

  render: function() {
    return (
      <nav className="c_nav">
        <NavItem to="builds">
          <i className="material-icons">storage</i>
        </NavItem>
        <NavItem to="add">
          <i className="material-icons">note_add</i>
        </NavItem>
        <NavItem to="settings">
          <i className="material-icons">settings</i>
        </NavItem>
      </nav>
    );
  }
});

export default Nav;