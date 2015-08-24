import React from 'react';
import Router from 'react-router';

import Body from './body';

let RouteNavigation = Router.Navigation;
let RouteHandler = Router.RouteHandler;

// class Home extends React.Component {

let Home = React.createClass({
  mixins: [RouteNavigation],

  componentDidMount: function() {

    setTimeout(() => {
      this.transitionTo('welcome');
    }, 1000);
  },

  render: function() {
    return (
      <div>
        'Home'
        <Body/>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = Home;