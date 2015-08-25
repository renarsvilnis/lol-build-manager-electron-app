import React from 'react';

let InputSelect = React.createClass({

  render: function() {

    let options = [];
    let defaultValue;

    this.props.options.forEach(function(option) {

      if(option.selected)
        defaultValue = option.value;

      options.push(
        <option
          key={option.value}
          value={option.value}>
          {option.name || option.key}
        </option>
      );
    });

    return (
      <select
        className={this.props.className}
        defaultValue={defaultValue}>
        {options}
      </select>
    );
  }
  
});

export default InputSelect;