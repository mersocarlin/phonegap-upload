import React from 'react';

import ApiService from '../../lib/api';


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
      baseUrl: "http://192.168.0.9:8083/",
      accessToken: ""
    }
  },

  componentDidMount() {
    this.logEvent("componentDidMount");
    this.retrieveFromLocalStorage();
  },

  logEvent(message) {
    //alert(message);
  },

  checkPhonegapCamera() {
    return navigator && navigator.camera;
  },

  getPhoto(source) {
    this.logEvent("getPhoto");

    if(!this.checkPhonegapCamera())
      return;

    let sourceType = navigator.camera.PictureSourceType;
    let destinationType = navigator.camera.DestinationType;

    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, {
      quality: 50,
      destinationType: destinationType.FILE_URI,
      sourceType: source === 0 ? sourceType.CAMERA : sourceType.PHOTOLIBRARY //SAVEDPHOTOALBUM
    });
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

  onFail(message) {
    alert('Failed because: ' + message);
  },

  sendToServer() {
    if(this.state.imageList.length == 0) {
      alert("There are no images to be sent to server");
      return;
    }

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

  saveToLocalStorage () {
    if(this.state.imageList.length == 0) {
      alert("There are no images to be saved in localStorage");
      return;
    }

    localStorage.images = JSON.stringify(this.state.imageList);
    alert("images saved on localStorage!");

    this.setState({
      imageList: []
    });
  },

  retrieveFromLocalStorage() {
    let images = JSON.parse(localStorage.images || "[]");
    if(images.length == 0) {
      alert("There are no images saved in localStorage");
    }
    this.setState({
      imageList: images
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
        <a className="waves-effect waves-light btn" onClick={this.getPhoto.bind(this, 0)}>
          <i className="mdi-image-photo-camera"></i>
        </a>
        <a className="waves-effect waves-light btn" onClick={this.getPhoto.bind(this, 1)}>
          <i className="mdi-image-photo-library"></i>
        </a>
        <a className="waves-effect waves-light btn" onClick={this.saveToLocalStorage}>
          <i className="mdi-content-save"></i>
        </a>
        <a className="waves-effect waves-light btn" onClick={this.retrieveFromLocalStorage}>
          <i className="mdi-file-cloud-download"></i>
        </a>
        <a className="waves-effect waves-light btn" onClick={this.sendToServer}>
          <i className="mdi-file-cloud-upload"></i>
        </a>

        {this.renderImages()}
      </div>
    );
  }

});
