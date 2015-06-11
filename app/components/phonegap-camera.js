import React from 'react';

import ApiService from '../../lib/api';

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

    let imageUrl = "data:image/jpeg;base64," + imageData;

    let imageList = this.state.imageList;
    imageList.push(imageUrl);

    this.setState({
      imageList: imageList
    });
  },

  // Called when a photo is successfully retrieved
  onPhotoURISuccess(imageURI) {
    this.logEvent("onPhotoURISuccess");

    let imageUrl = imageURI;

    let imageList = this.state.imageList;
    imageList.push(imageUrl);

    this.setState({
      imageList: imageList
    });
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

  componentDidMount() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;

    this.logEvent("componentDidMount");
  },

  getInitialState() {
    return {
      imageList: []
    }
  },

  sendToServer() {
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

        payload.images = [];
        for(let key in this.refs) {
          if(key.indexOf("image_") == -1)
            continue;

          let imgElement = React.findDOMNode(this.refs[key]);
          if(imgElement.files) {
            if(imgElement.files.length) {
              payload.images.push(imgElement.files[0]);
            }
          }
          else {
            alert("no file");
          }
        }

        ApiService.services.image.create2(baseUrl, accessToken, payload)
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
            this.state.imageList.map((imageUrl, index) => {
              let refName = "image_" + index;
              return (
                <div className="row">
                  <div className="col s12">
                    <div className="card">
                      <div className="card-image">
                        <img src={imageUrl} ref={refName}/>
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
        <button className="waves-effect waves-light btn" onClick={this.capturePhoto}>Capture Photo</button> <br />
        <button className="waves-effect waves-light btn" onClick={this.getPhoto}>From Photo Library</button><br />
        <button className="waves-effect waves-light btn" onClick={this.sendToServer}>Send to Server</button><br />
        {this.renderImages()}
      </div>
    );
  }

});
