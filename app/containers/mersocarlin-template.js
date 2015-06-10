import React from 'react';

//import ImageUpload from '../components/image-upload';

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

export default React.createClass({

  logEvent(message) {
    //alert(message);
  },

  checkPhonegapCamera() {
    return navigator && navigator.camera;
  },

  // Called when a photo is successfully retrieved
  onPhotoDataSuccess(imageData) {
    this.logEvent("onPhotoDataSuccess");
    // Uncomment to view the base64-encoded image data
    console.log(imageData);

    // Get image handle
    var smallImage = document.getElementById('smallImage');

    React.findDOMNode(this.refs.smallImageText).value = imageData;

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    smallImage.src = "data:image/jpeg;base64," + imageData;
  },

  // Called when a photo is successfully retrieved
  onPhotoURISuccess(imageURI) {
    this.logEvent("onPhotoURISuccess");
    // Uncomment to view the image file URI
    console.log(imageURI);

    // Get image handle
    var largeImage = document.getElementById('largeImage');

    React.findDOMNode(this.refs.largeImageText).value = imageURI;

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    largeImage.src = imageURI;
  },

  capturePhoto() {
    this.logEvent("capturePhoto");

    if(!this.checkPhonegapCamera())
      return;
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
      quality: 50,
      destinationType: destinationType.DATA_URL
    });
  },

  capturePhotoEdit() {
    this.logEvent("capturePhotoEdit");

    if(!this.checkPhonegapCamera())
      return;
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
      quality: 20,
      allowEdit: true,
      destinationType: destinationType.DATA_URL
    });
  },

  getPhoto(source) {
    this.logEvent("getPhoto");

    if(!this.checkPhonegapCamera())
      return;
    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, {
      quality: 50,
      destinationType: destinationType.FILE_URI,
      sourceType: source
    });
  },

  onFail(message) {
    alert('Failed because: ' + message);
  },

  onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;

    this.logEvent("onDeviceReady");
    this.setState({ deviceready: true });
  },

  getInitialState() {
    return {
      deviceready: true
    }
  },

  componentDidMount() {
    document.addEventListener("deviceready",this.onDeviceReady,false);
  },

  renderApp() {
    if(this.state.deviceready) {
      if(!pictureSource)
        pictureSource = {};
      return (
        <div>
          <button className="waves-effect waves-light btn" onClick={this.capturePhoto}>Capture Photo</button> <br />
          <button className="waves-effect waves-light btn" onClick={this.capturePhotoEdit}>Capture Editable Photo</button> <br />
          <button className="waves-effect waves-light btn" onClick={this.getPhoto.bind(this, pictureSource.PHOTOLIBRARY)}>From Photo Library</button><br />
          <button className="waves-effect waves-light btn" onClick={this.getPhoto.bind(this, pictureSource.SAVEDPHOTOALBUM)}>From Photo Album</button><br />

          <div className="container">
            <div className="row">
              <div className="col s6">
                <img className="responsive-img" id="smallImage" src="" />
              </div>
              <div className="col s6">
                <img className="responsive-img" id="largeImage" src="" />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="text" ref="smallImageText" />
                <label for="email">smallImage</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="text" ref="largeImageText"/>
                <label for="email">largeImage</label>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>loading...</div>
      );
    }
  },

  render() {
    return (
      <div>
        {this.renderApp()}
      </div>
    );
  }

});
