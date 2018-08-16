const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
before( (done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
  .once('open', () => {done();})
  .on('error', (error)=> console.warn('Warning', error));

});

// define the mongoose connection before this
beforeEach(  (done) =>{
  mongoose.connection.collections.users.drop(()=>{
    done();
  });
});

//https://medium.com/@danmolitor/writing-tests-for-mongo-mongoose-with-mocha-7e98be740074
