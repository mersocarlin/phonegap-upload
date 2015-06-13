import rsvp from 'rsvp';

export default () => {
  return new rsvp.Promise(function(fulfill, reject) {
    // if(navigator && navigator.connection) {
    //   let networkState = navigator.connection.type;
    //   if(networkState == Connection.NONE)
    //     reject();
    // }
    fulfill();
  });
}
