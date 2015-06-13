import React from 'react';


import PhonegapCamera from '../components/phonegap-camera';
import PersonsAdd from '../containers/persons-add';


export default React.createClass({

  getInitialState() {
    return {
      deviceready: true
    }
  },

  componentDidMount() {
    //document.addEventListener("deviceready", this.onDeviceReady, false);
  },

  onDeviceReady() {
    //this.setState({ deviceready: true });
  },

  render() {

    if(this.state.deviceready) {
      return (
        <div>
          {/*<PhonegapCamera />*/}
          <PersonsAdd />
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
