import React from 'react';

import ApiService from '../../lib/api';

import PhonegapCamera from '../components/phonegap-camera';

//import ImageUpload from '../components/image-upload';

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

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

  onClick() {
    for(let key in this.refs) {
      if(key.indexOf("test_") == -1)
        continue;

      console.log("test here", React.findDOMNode(this.refs[key]).text);
    }

    let baseUrl = "http://192.168.0.7:8083/";
    let accessToken = "";

    ApiService.services.image.fetchAll(baseUrl, accessToken)
      .then((response) => {
        //console.log('AppsActions.search', 'done');

        console.log(response.data);
        //done();
      })
      //.then(undefined, middlewares.unauthorized.bind(null, ctx))
      .catch((err) => {
        //console.log('AppsActions.search', 'error', err);
        //ctx.dispatch('APPS_SEARCH_REQUEST_FAIL', err);
        console.log(err);
        //done();
      });

      var payload = {
        id: 123,
        name: "sending name here",
        images: ["test1", "test2"]
      };
      ApiService.services.image.create(baseUrl, accessToken, payload)
        .then((response) => {
          //console.log('AppsActions.search', 'done');

          console.log(response.data);
          //done();
        })
        //.then(undefined, middlewares.unauthorized.bind(null, ctx))
        .catch((err) => {
          //console.log('AppsActions.search', 'error', err);
          //ctx.dispatch('APPS_SEARCH_REQUEST_FAIL', err);
          console.log(err);
          //done();
        });
  },

  render() {

    let testArray = [1,2,3];

    if(this.state.deviceready) {
      return (
        <div>
          {
            testArray.map((item, index) => {
              let refName = "test_" + index;
              return <button onClick={this.onClick} ref={refName}>Test</button>;
            })
          }
          <br/>
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
