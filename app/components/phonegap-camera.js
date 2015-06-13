import React from 'react';

import ApiService from '../../lib/api';


var pictureSource;   // picture source
var destinationType; // sets the format of returned value

export default React.createClass({

  getInitialState() {
    return {
      imageList: []
    }
  },

  propTypes: {
    baseUrl: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      baseUrl: "http://192.168.0.7:8083/",
      accessToken: ""
    }
  },

  componentDidMount() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;

    this.logEvent("componentDidMount");
  },

  logEvent(message) {
    //alert(message);
  },

  checkPhonegapCamera() {
    return navigator && navigator.camera;
  },

  onPhotoURISuccess(imageURI) {
    this.logEvent("onPhotoURISuccess");

    let imageList = this.state.imageList;
    imageList.push({
      url: imageURI
    });

    this.setState({
      imageList: imageList
    });
  },

  capturePhoto() {
    this.logEvent("capturePhoto");

    if(!this.checkPhonegapCamera())
      return;

    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, {
      quality: 50,
      destinationType: destinationType.FILE_URI
    });
  },

  getPhoto() {
    this.logEvent("getPhoto");

    if(!this.checkPhonegapCamera())
      return;

    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, {
      quality: 50,
      destinationType: destinationType.FILE_URI,
      sourceType: pictureSource.PHOTOLIBRARY //SAVEDPHOTOALBUM
    });
  },

  onFail(message) {
    alert('Failed because: ' + message);
  },

  sendToServer() {

    let payload = {
      filesToCreate: this.state.imageList
    };

    ApiService.services.image.upload(this.props.baseUrl, this.props.accessToken, payload)
      .then((response) => {
        //console.log('AppsActions.search', 'done');
        alert("success: " + response.createdFiles.length);

        let strResponse = "";
        for(let key in response.createdFiles)
          strResponse += "\n " + response.createdFiles[key].hash;
        alert(strResponse);

        //done();
      }.bind(this))
      //.then(undefined, middlewares.unauthorized.bind(null, ctx))
      .catch((err) => {
        //console.log('AppsActions.search', 'error', err);
        //ctx.dispatch('APPS_SEARCH_REQUEST_FAIL', err);
        alert("error " + err);
        //done();
      });
  },

  renderImages() {
    if(this.state.imageList.length == 0) {
      return (
        <div>
          No images yet
        </div>
      );
    }
    else {
      this.logEvent("test " + this.state.imageList.length);
      return (
        <div className="container">
          {
            this.state.imageList.map((image, index) => {
              let refName = "image_" + index;
              return (
                <div className="row">
                  <div className="col s12">
                    <div className="card">
                      <div className="card-image">
                        <img src={image.url} ref={refName}/>
                      </div>
                      <div className="card-content">
                        Image {index} <br/>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      );

    }
  },

  render() {
    return (
      <div>
        <button className="waves-effect waves-light btn" onClick={this.capturePhoto}>Capture Photo</button> <br />
        <button className="waves-effect waves-light btn" onClick={this.getPhoto}>From Photo Library</button><br />
        <button className="waves-effect waves-light btn" onClick={this.sendToServer}>Send to Server</button><br />

        {this.renderImages()}
      </div>
    );
  }

});
