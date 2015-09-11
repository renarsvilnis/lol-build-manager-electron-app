'use strict';

import React from 'react';
import scraper from '../modules/scraper';

import GuideActions from '../actions/guide-actions';
// import GuideStore from '../stores/guide-store';

const inputPlaceholder = 'http://www.mobafire.com/league-of-legends/build/manzeys-all-around-twisted-fate-guide-includes-all-roles-429408';

let BuildAdd = React.createClass({

  getInitialState () {
    return {
      scraping: false,
      url: inputPlaceholder,
      outputMessage: ''
    };
  },

  urlChange (ev) {
    this.setState({
      url: ev.target.value
    });
  },

  addBuild (ev) {
    this.setState({
      outputMessage: '',
      scraping: true
    }, function () {
      scraper(this.state.url, (err, results) => {
        let outputMessage = err ? err.message : '';

        this.setState({
          outputMessage,
          scraping: false
        });

        console.log(err, results);

        if (!err) {
          GuideActions.guideCreate({guide: results});
        }
      });
    });
  },

  render () {
    return (
      <div className="c_build-add">

        <h2>
          {'BuildAdd'}
        </h2>

        {'Url:'}

        <input
          disabled={this.state.scraping || !navigator.onLine}
          onChange={this.urlChange}
          placeholder={inputPlaceholder}
          type="text"
          value={this.state.url}
        />

        <button
          disabled={!this.state.url || this.state.scraping || !navigator.onLine}
          onClick={this.addBuild}
        >
          {'Add'}
        </button>

        <div>{this.state.outputMessage}</div>
      </div>
    );
  }
});

export default BuildAdd;
