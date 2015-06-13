import _ from 'lodash';

import FluxStore from './flux-store';
import { ActionTypes } from '../actions/persons';
import { Status } from '../constants/constants';


class PersonsStore extends FluxStore {
  constructor() {
    super();

    this.bindActions(
      ActionTypes.FetchAllPending, this.onFetchAllPending,
      ActionTypes.FetchAllSuccess, this.onFetchAllSuccess,
      ActionTypes.FetchAllError  , this.onFetchAllError
    );
  }

  getInitialState() {
    return {
      persons: null,
      images : null,
      error  : null,
      status : Status.Ok
    };
  }

  onFetchAllPending () {
    this.setState({
      persons: null,
      images : null,
      error  : null,
      status : Status.Pending
    });
  }

  onFetchAllSuccess (payload) {
    this.setState({
      persons: payload.data,
      images : null,
      error  : null,
      status : Status.Ok
    });
  }

  onFetchAllError (error) {
    this.setState({
      persons: null,
      images : null,
      error  : error,
      status : Status.Errors
    });
  }

}


export default new PersonsStore();
