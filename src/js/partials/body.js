'use strict';

var React = require('react');

class BodyRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      background: null,
      iconBackgroundColor: 'transparent'
    };
  }

  componentDidMount() {
    // var that = this;
    // var colorThief = new ColorThief();
    // var $icon = this.getDOMNode().querySelector('.icon');

    // $icon.addEventListener('load', function() {
    //   var color = colorThief.getColor($icon, 10);
    //   that.setState({
    //     iconBackgroundColor: 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
    //   });
    // }, false);
  }

  render() {

    var styles = {
      backgroundImage: this.props.background
    };

    var imgUrls = {
      '1x': 'src/img/empty_folder_v1.png',
    }

    var icon;

    if(this.props.url) {
      icon = (<img className="icon node-circle"
        src={'chrome://favicon/size/16@1x/' + this.props.url}
        alt="/images/empty_folder_v1.png"
        style={{
          backgroundColor: this.state.iconBackgroundColor
        }}/>);

    } else {
      icon = (<img className="icon node-circle" src="/images/empty_folder_v1.png" alt=""/>);
    }

    return (
      <div className="node"
        style={styles}
        data-depth={this.props.depth}
        >
        <div className="node-arrow" onClick={this.expandCollapseFolder}/>
        {icon}
        <div className="node-title">{this.props.title}</div>
        <div className="node-line"/>

      </div>

    );
  }
}

// <a className="bookmark" style={styles} href={this.props.url}>
//   <div className="background"></div>
//   <div className="content">
//     {icon}
//     <span className="title">{this.props.title}</span>
//     <span className="url">{this.props.url}</span>
//   </div>
// </a>

class Body extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    };
  }

  handleSearch(ev) {
    this.setState({searchValue: ev.target.value.toLocaleLowerCase()});
  }

  render() {
    var value = this.state.searchValue;

    return (
      <div id="bkm-body">
        <input className="body-search" type="text" placeholder="search.." value={value} onChange={this.handleSearch} />
        <div className="bookmarks">
          {this.props.bookmarks.map(function(bookmark) {

            var title = bookmark.title.toLocaleLowerCase();
            var url = bookmark.url ? bookmark.url.toLocaleLowerCase() : null;
            if(!value || (value && (title.indexOf(value) > -1 || (url && url.indexOf(value) > -1)))) {
              return <BodyRow key={bookmark.id} title={bookmark.title} url={bookmark.url} />
            }
          })}
        </div>

        <footer>
          {/*<button>Settings</button>
          <button>Shortcuts</button>
          <button>Made by Renārs Vilnis</button>*/}
        </footer>
      </div>
    );
  }
}

export default Body;