import React from 'react';

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

    // Unhide image elements
    smallImage.style.display = 'block';

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

    // Unhide image elements
    largeImage.style.display = 'block';

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

          <img id="smallImage" src="" />
          <img id="largeImage" src="" />
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
