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
        <NavItem to="builds">B</NavItem>
        <NavItem to="add">+</NavItem>
        <NavItem to="settings">S</NavItem>
      </nav>
    );
  }
});

export default Nav;