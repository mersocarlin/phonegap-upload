import React from 'react/addons';


export default React.createClass({
  propTypes: {
    src: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      src: ""
    };
  },

  render () {
    return (
      <div className="img-upload">
        <img className="responsive-img" src={this.props.src} />
      </div>
    );
  }
});
