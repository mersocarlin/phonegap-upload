import { Dispatcher } from 'flux';


class AppDispatcher extends Dispatcher {
  dispatch (actionType, data) {
    console.log('AppDispatcher.dispatch', actionType, data);
    super.dispatch({ actionType: actionType, data: data });
  }
}


export default new AppDispatcher();
