
const assert = require('assert');
const User = require('../src/user');

describe('Reading Users out of the database', ()=> {
  let sherill;
  beforeEach(async () => {
    sherill = new User({ name : 'Sherill'});
    await sherill.save();
  });
  //32
  it('model instance remove', async() =>{
    await sherill.remove();
    const find = await User.findOne({name: 'Sherill'});
    assert(find === null);
  });
  //33
  it('class method remove',async () =>{
    await User.remove({name: 'Sherill'});
    const find = await User.findOne({name: 'Sherill'});
    assert(find === null);
  });
  //34
  it('class method findOneAndRemove', async () =>{
    await User.findOneAndRemove({name: 'Sherill'});
    const find = await User.findOne({name: 'Sherill'});
    assert(find === null);
  });
  it('class method findByIdAndRemove', async () =>{
    await User.findByIdAndRemove(sherill._id);
    const find = await User.findOne({name: 'Sherill'});
    assert(find === null);
  });
});
