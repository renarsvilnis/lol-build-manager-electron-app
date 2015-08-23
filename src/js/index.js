var ipc = require('ipc');
ipc.on('url', function(ev, ev2, url) {
  console.log(ev, ev2, url);
});

ipc.send('db.getGameVersion');
ipc.once('db.getGameVersion.reply', function(ver) {
  console.log('Version:', ver);
});


let React = require('react');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="hello">World</div>);
  }
}

React.render(
  <App/>,
  document.body
);



document.addEventListener('DOMContentLoaded', function() {
};