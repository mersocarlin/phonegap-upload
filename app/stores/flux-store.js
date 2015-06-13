import AppDispatcher from '../dispatcher/dispatcher';
import { EventEmitter } from 'events';
import ObjectAssign from 'object-assign';


let CHANGE_EVENT = 'CHANGE_EVENT';


class FluxStore extends EventEmitter {
  constructor () {
    super();

    this.actions = {};
    this.state = this.getInitialState();
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  getInitialState () {
    return {};
  }

  setState (pendingState) {
    if(typeof pendingState == 'object') {
      ObjectAssign(this.state, this.state, pendingState);
      this.emitChange();
    }
  }

  replaceState (pendingState) {
    this.state = pendingState;
    this.emitChange();
  }

  resetState () {
    this.replaceState(this.getInitialState());
  }

  getState () {
    return this.state;
  }

  emitChange () {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener (handler) {
    this.on(CHANGE_EVENT, handler);
  }

  removeChangeListener (handler) {
    this.removeListener(CHANGE_EVENT, handler);
  }

  handleAction (payload) {
    if(this.actions[payload.actionType]) {
      this.actions[payload.actionType](payload);
    }
  }

  bindActions (...actions) {
    if (actions.length > 1 && actions.length % 2 !== 0) {
      throw new Error("bindActions must take an even number of arguments.");
    }
    for(let i = 0; i < actions.length; i += 2) {
      let type = actions[i], handler = actions[i+1];
      this.bindAction(type, handler);
    }
  }

  bindAction (type, handler) {
    this.actions[type] = handler.bind(this);
  }

}


module.exports = FluxStore;
