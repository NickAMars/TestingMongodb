const assert = require('assert');
const User = require('../src/user');
describe('Reading Users out of the database', ()=> {
  let amanda
  beforeEach(async () => {
    amanda = new User({ name : 'Amanda'});
    await amanda.save();
  });
  it('finds all users with a name of joe', async () => {
    const found = await User.find({name: 'Amanda'});
   assert(found[0]._id.toString() === amanda._id.toString());
  });
  it('finds all users with a unique id', async () => {
    const found = await User.findOne({_id: amanda._id});
   assert(found.name.toString() === amanda.name.toString());
  });
});
