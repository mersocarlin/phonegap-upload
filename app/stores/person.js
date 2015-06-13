import _ from 'lodash';

import FluxStore from './flux-store';
import { ActionTypes } from '../actions/person';
import { Status } from '../constants/constants';


class PersonStore extends FluxStore {
  constructor() {
    super();

    this.bindActions(
      ActionTypes.FetchByIdPending, this.onFetchByIdPending,
      ActionTypes.FetchByIdSuccess, this.onFetchByIdSuccess,
      ActionTypes.FetchByIdError  , this.onFetchByIdError,

      ActionTypes.CreatePending, this.onCreatePending,
      ActionTypes.CreateSuccess, this.onCreateSuccess,
      ActionTypes.CreateError  , this.onCreateError,

      ActionTypes.UploadImagesPending, this.onUploadImagesPending,
      ActionTypes.UploadImagesSuccess, this.onUploadImagesSuccess,
      ActionTypes.UploadImagesError  , this.onUploadImagesError
    );
  }

  getInitialState() {
    return {
      person        : null,
      images        : null,
      imagesUploaded: false,
      error         : null,
      status        : Status.Ok,
    };
  }

  onFetchByIdPending () {
    this.setState({
      person        : null,
      images        : null,
      imagesUploaded: false,
      error         : null,
      status        : Status.Pending,
    });
  }

  onFetchByIdSuccess (payload) {
    this.setState({
      person        : payload.data,
      images        : null,
      imagesUploaded: false,
      error         : null,
      status        : Status.Ok,
    });
  }

  onFetchByIdError (error) {
    this.setState({
      person        : null,
      images        : null,
      imagesUploaded: false,
      error         : error,
      status        : Status.Errors
    });
  }

  onCreatePending () {
    this.setState({
      person        : null,
      error         : null,
      imagesUploaded: false,
      status        : Status.Pending
    });
  }

  onCreateSuccess (payload) {
    this.setState({
      person: payload,
      error : null,
      status: Status.Ok
    });
  }

  onCreateError (error) {
    this.setState({
      person : null,
      error  : error,
      status : Status.Errors
    });
  }

  onUploadImagesPending () {
    this.setState({
      persons       : null,
      images        : null,
      imagesUploaded: false,
      error         : null,
      status        : Status.Pending
    });
  }

  onUploadImagesSuccess (payload) {
    this.setState({
      person        : null,
      images        : payload,
      imagesUploaded: true,
      error         : null,
      status        : Status.Ok
    });
  }

  onUploadImagesError (error) {
    this.setState({
      persons       : null,
      images        : null,
      imagesUploaded: false,
      error         : error,
      status        : Status.Errors
    });
  }

}


export default new PersonStore();
