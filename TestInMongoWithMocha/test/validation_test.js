const assert = require('assert');
const User = require('../src/user');
describe('Reading Users out of the database', ()=> {
  it('require a user name',() => {
    const user = new User({ name : undefined });
    // check if the value is valid
    const validateResult = user.validateSync();
      // when its invalid
      const { message }= validateResult.errors.name;
      assert( message === 'Name is required.');
  });

  it('require a user\'s name longer than 2 characters', ()=>{
    const user = new User({ name : 'Al'});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert( message === 'Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', async ()=>{
    const user = new User({ name : 'Al'});
      try{
        await user.save();
      }catch(validationResult){
        const { message } = validationResult.errors.name;
        assert( message === 'Name must be longer than 2 characters.');
      }
  });
});
