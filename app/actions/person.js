import ApiService from '../../lib/api';
import Dispatcher from '../dispatcher/dispatcher';
import config from '../env/config';
import checkConnection from '../middlewares/check-connection'

import keyMirror from 'keymirror';

export let ActionTypes = keyMirror({
  FetchByIdPending: null,
  FetchByIdSuccess: null,
  FetchByIdError  : null,

  CreatePending: null,
  CreateSuccess: null,
  CreateError: null,

  UploadImagesPending: null,
  UploadImagesSuccess: null,
  UploadImagesError  : null
}, 'Person:');

let accessToken = "";

export default {
  fetchById (payload) {
    Dispatcher.dispatch(ActionTypes.FetchByIdPending);

    checkConnection().then(() => {
      ApiService.services.person.fetchById(config.fileService.url, accessToken, payload)
        .then((response) => {
          localStorage.phonegapUpload_personList = JSON.stringify(response.data);
          Dispatcher.dispatch(ActionTypes.FetchByIdSuccess, response.data);
        }.bind(this))
        //.then(undefined, middlewares.unauthorized.bind(null, ctx))
        .catch((err) => {
          alert("error " + err);
          Dispatcher.dispatch(ActionTypes.FetchByIdError, err);
        });
    }, () => {
      Dispatcher.dispatch(ActionTypes.FetchByIdSuccess, JSON.parse(localStorage.phonegapUpload_personList || '[]'));
    });
  },

  create(payload) {
    Dispatcher.dispatch(ActionTypes.CreatePending);

    checkConnection().then(() => {
      Dispatcher.dispatch(ActionTypes.CreateSuccess, payload);
      // ApiService.services.person.create(config.fileService.url, accessToken, payload)
      //   .then((response) => {
      //     //localStorage.phonegapUpload_personList = JSON.stringify(response.data);
      //     Dispatcher.dispatch(ActionTypes.CreateSuccess, response.data);
      //   }.bind(this))
      //   //.then(undefined, middlewares.unauthorized.bind(null, ctx))
      //   .catch((err) => {
      //     //alert("error " + err);
      //     Dispatcher.dispatch(ActionTypes.CreateError, err);
      //   });
    }, () => {
      Dispatcher.dispatch(ActionTypes.FetchByIdSuccess, JSON.parse(localStorage.phonegapUpload_personList || '[]'));
    });
  },

  uploadImages(payload) {
    Dispatcher.dispatch(ActionTypes.UploadImagesPending);

    checkConnection().then(() => {
      ApiService.services.image.upload(config.fileService.url, accessToken, payload)
        .then((response) => {
          //alert("success: " + response.createdFiles.length);
          Dispatcher.dispatch(ActionTypes.UploadImagesSuccess, response.createdFiles);
        }.bind(this))
        //.then(undefined, middlewares.unauthorized.bind(null, ctx))
        .catch((err) => {
          alert("UploadImagesError: " + err);
          Dispatcher.dispatch(ActionTypes.UploadImagesError);
        });
    }, () => {
      alert("No connection! You must implement!");
      Dispatcher.dispatch(ActionTypes.UploadImagesSuccess);
    })
  }
};
