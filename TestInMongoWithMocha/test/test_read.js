const assert = require('assert');
const User = require('../src/user');
describe('Reading Users out of the database', ()=> {
  let amanda, sherill, abby, nemo;
  beforeEach(async () => {
    amanda  = new User({ name : 'Amanda'});
    sherill = new User({ name : 'Sherill'});
    abby    = new User({ name : 'Abby'});
    nemo    = new User({ name : 'Nemo'});

    //save operations in parallel
    await Promise.all([amanda.save() ,sherill.save(), abby.save(), nemo.save()]);
  });
  it('finds all users with a name of joe', async () => {
    const found = await User.find({name: 'Amanda'});
   assert(found[0]._id.toString() === amanda._id.toString());
  });
  it('finds all users with a unique id', async () => {
    const found = await User.findOne({_id: amanda._id});
   assert(found.name.toString() === amanda.name.toString());
  });

  it('can skip and limit the result set',async ()=>{
      const users = await User.find({})
      .sort({ name: 1})
      .skip(1)
      .limit(2);
      assert(users.length === 2);
      assert(users[0]['name'] === 'Amanda');
      assert(users[1]['name'] === 'Nemo');
  });
});
