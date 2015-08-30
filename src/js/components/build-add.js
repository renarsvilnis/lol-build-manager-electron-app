'use strict';

import React from 'react';
import scraper from '../modules/scraper';

const inputPlaceholder = 'http://www.mobafire.com/league-of-legends/build/manzeys-all-around-twisted-fate-guide-includes-all-roles-429408';

let BuildAdd = React.createClass({

  getInitialState: function() {
    return {
      scraping: false,
      url: '',
      outputMessage: '',
    }
  },

  urlChange: function(ev) {
    this.setState({
      url: ev.target.value
    })
  },

  addBuild: function(ev) {
    this.setState({
      outputMessage: '',
      scraping: true
    }, function() {
      scraper(this.state.url, (err, results) => {

        let outputMessage = err ? err.message : '';

        this.setState({
          outputMessage,
          scraping: false
        });

        if(!err)
          GuideActions.guideCreate({guide: results});

      })  
    });
  },

  render: function() {
    return (
      <div className="c_build-add">
        <h2>BuildAdd</h2>
        Url:
        <input
          type="text"
          placeholder={inputPlaceholder}
          onChange={this.urlChange}
          value={this.state.url}
          disabled={this.state.scraping || !navigator.onLine} />
        <button
          disabled={!this.state.url || this.state.scraping || !navigator.onLine}
          onClick={this.addBuild}>Add</button>
        <div>{this.state.outputMessage}</div>
      </div>
    );
  }
});

export default BuildAdd;
