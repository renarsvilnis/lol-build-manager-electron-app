import React from 'react';
import Router from 'react-router';

import Body from './body';
import Sidebar from './sidebar';
import Nav from './nav';

import AppStore from '../stores/app-store';

let RouteNavigation = Router.Navigation;
let RouteHandler = Router.RouteHandler;



let Home = React.createClass({
  mixins: [RouteNavigation],

  componentDidMount: function() {
    // if(AppStore.showWelcomeScreen()) {
    //   this.transitionTo('welcome');
    // }
  },

  render: function() {
    return (
      <div className="v_home">
        <Nav/>
        <Sidebar/>
        <Body/>
        {/*<RouteHandler {...this.props} />*/}
      </div>
    );
  }
});

module.exports = Home;