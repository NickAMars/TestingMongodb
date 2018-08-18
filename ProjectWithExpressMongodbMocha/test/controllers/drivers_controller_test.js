const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const  Driver = mongoose.model('driver');
describe('Drivers controller', ()=>{
  beforeEach( async  ()=>{
    // removing everything everything from the
    // database before doing test
    await Driver.deleteMany({});
  });
  it('Post to /api/drivers creates a new driver', async () =>{

    const drivers = await Driver.countDocuments();
    try{
      request(app)
      .post('/api/drivers')
      // send information to the server
      .send({email: 'test@test.com'})
      .end( async (err,res)=>{
        const Newdriver = await Driver.countDocuments();
        assert(drivers + 1 === Newdriver);
      });
    }catch(err){
      console.warn(err);
    }
  });

  /*

  For some weard reason i couldnt get the find method to work in the
  request(app).end method so i change my code to see if this would work
  insted and it didnt
  */
  it('PUT to /api/drivers/id edits an existing driver', (done)=>{
    // creates a new driver
    const driver = new Driver({email: 'dovber@gem.com'});
    driver.save()
    .then(() => {
      request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({ driving: true})
      .end(async () => {
        const updatedDriver = await Driver.findOne({email: 'dovber@gem.com'});
        assert(updatedDriver['driving'] === true);
        done();
      });
    });
  });


  it('Delete to /api/drivers/id delete an existing driver', async ()=>{
    const Gemma = new Driver({email: 'gemma@gem.com'});
    await Gemma.save();
    try{
      request(app)
      .delete(`/api/drivers/${Gemma._id}`)
      .end(async () => {
        const deleteDriver = await Driver.findOne({email: 'gemma@gem.com'});
        // console.log('delete driver : ',deleteDriver )
        assert(deleteDriver === null);
      });
    }catch(err){
      console.warn(err);
    }
  });
});
