import React from 'react';


import ApiService from '../../lib/api';


import PhonegapCamera from '../components/phonegap-camera';


export default React.createClass({

  getInitialState() {
    return {
      deviceready: false
    }
  },

  componentDidMount() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },

  onDeviceReady() {
    this.setState({ deviceready: true });
  },

  render() {

    if(this.state.deviceready) {
      return (
        <div>
          <PhonegapCamera />
        </div>
      );
    }
    else {
      return (
        <div>loading...</div>
      );
    }
  }

});
