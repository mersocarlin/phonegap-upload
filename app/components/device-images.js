import React from 'react';



export default React.createClass({

  getInitialState() {
    return {
      images: []
    }
  },

  componentDidMount() {
    this.logEvent("componentDidMount");
  },

  logEvent(message) {
    //alert(message);
  },

  checkPhonegapCamera() {
    return navigator && navigator.camera;
  },

  getPhoto(source) {
    this.logEvent("getPhoto");

    if(!this.checkPhonegapCamera()) {
      alert("plugin for camera not found!");
      return;
    }

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

    let images = this.state.images;
    images.push({
      url: imageURI
    });

    this.setState({
      images: images
    });
  },

  onFail(message) {
    alert('Failed because: ' + message);
  },

  getImages() {
    if(this.state.images.length == 0) {
      alert("Please select at least one image for this person");
      return null;
    }

    let payload = {
      filesToCreate: this.state.images
    };

    return payload;
  },

  renderImages() {
    if(this.state.images.length == 0) {
      return (
        <div>
          No images yet
        </div>
      );
    }
    else {
      return (
        <div>
          {
            this.state.images.map((image, index) => {
              return (
                <div className="row">
                  <div className="col s12">
                    <div className="card">
                      <div className="card-image">
                        <img src={image.url} />
                      </div>
                      <div className="card-content">
                        Image {index}
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
        {this.renderImages()}
      </div>
    );
  }

});
