import ApiService from '../../lib/api';
import Dispatcher from '../dispatcher/dispatcher';
import config from '../env/config';
import checkConnection from '../middlewares/check-connection'

import keyMirror from 'keymirror';

export let ActionTypes = keyMirror({
  FetchAllPending: null,
  FetchAllSuccess: null,
  FetchAllError  : null
}, 'Persons:');

let accessToken = "";

export default {
  fetchAll () {
    Dispatcher.dispatch(ActionTypes.FetchAllPending);

    checkConnection().then(() => {
      ApiService.services.image.fetchAll(config.fileService.url, accessToken)
        .then((response) => {
          //Includes featuredApp in cachedApps
          localStorage.phonegapUpload_personList = JSON.stringify(response.data);
          Dispatcher.dispatch(ActionTypes.FetchAllSuccess, response.data);
        }.bind(this))
        //.then(undefined, middlewares.unauthorized.bind(null, ctx))
        .catch((err) => {
          alert("error " + err);
          Dispatcher.dispatch(ActionTypes.FetchAllError, err);
        });
    }, () => {
      Dispatcher.dispatch(ActionTypes.FetchAllSuccess, JSON.parse(localStorage.phonegapUpload_personList || '[]'));
    });
  },

};
