import React from 'react';

import FluxMixins from '../mixins/flux';
//import { Navigation } from 'react-router';
//import router from '../utils/router';
import { Status } from '../constants/constants';

import DeviceImages from '../components/device-images';

import PersonStore from '../stores/person';
import PersonActions from '../actions/person';

export default React.createClass({
  mixins: [ FluxMixins /*, Navigation*/ ],

  statics: {
    storeListeners: { 'onPersonStoreChange': PersonStore },
  },

  getInitialState () {
    return PersonStore.getInitialState();
  },

  componentDidUpdate () {
    if(this.state.imagesUploaded) {
      alert("images uploaded!");
      this.onSavePerson();
    }
    else if(this.state.person != null) {
      alert("Person saved!");
    }
  },

  onPersonStoreChange () {
    const state = PersonStore.getState();

    this.setState({
      person        : state.person,
      images        : state.images,
      imagesUploaded: state.imagesUploaded,
      error         : state.error,
      pending       : state.status == Status.Pending
    });
  },

  onSavePerson() {
    let payload = {
      name: React.findDOMNode(this.refs.person_name).value,
      age: React.findDOMNode(this.refs.person_age).value,
      images: this.state.images
    };

    this.executeAction(PersonActions.create, payload);
  },

  onSave() {
    let payload = this.refs["person_images"].getImages();

    if(payload == null)
      return;

    this.executeAction(PersonActions.uploadImages, payload);
  },

  renderPersonForm() {
    return (
      <div>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input id="person_name" type="text" ref="person_name" />
                <label htmlFor="person_name">Name</label>
              </div>
              <div className="input-field col s6">
                <input id="person_age" type="text" ref="person_age" />
                <label htmlFor="person_age">Age</label>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col s12">
            <DeviceImages ref="person_images"/>
          </div>
        </div>
      </div>
    );
  },

  render () {
    return (
      <div id='persons-add' className='container'>
        {/*this.state.pending && <div className='activityIndicator'><i className='fa fa-circle-o-notch fa-lg fa-spin'></i></div>*/}
        {/*this.state.error && <p className='error-message text-center'>{Strings.ApplicationList.Errors.FetchAllError}</p>*/}

        <div className="row">
          <div className="col s12">
            <a className="waves-effect waves-light btn" onClick={this.onSave}>
              <i className="mdi-content-save"></i>
            </a>
          </div>
        </div>

        {this.renderPersonForm()}
      </div>
    );
  }
});
