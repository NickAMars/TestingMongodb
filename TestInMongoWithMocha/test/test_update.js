const assert = require('assert');
const User = require('../src/user');
describe('Reading Users out of the database', ()=> {
  let neil
  beforeEach(async () => {
    neil = new User({ name : 'Neil', likes: 20});
    await neil.save();
  });
// 37
  it('model instance type using "set" and "save"',async ()=>{
    await neil.set({name: 'NeilArmstrong'}).save();
    const find = await User.findOne({name: 'NeilArmstrong'});
    assert(find.name === 'NeilArmstrong');
  });
  it('model instance type using update',async ()=>{
    await neil.update({name: 'rooster'});
    const find = await User.findOne({name: 'rooster'});
    assert(find.name === 'rooster');
  });

  it('model class can update',async ()=>{
    await User.update({name:'Neil'},{name: 'Married'});
    const find = await User.findOne({name: 'Married'});
    assert(find.name === 'Married');
  });
  it('model class can update one record',async ()=>{
    await User.findOneAndUpdate({name:'Neil'},{name: 'Vietname'});
    const find = await User.findOne({name: 'Vietname'});
    assert(find.name === 'Vietname');
  });
  it('model class can find a record with an Id and update',async ()=>{
    await User.findByIdAndUpdate(neil._id, {name: 'son'});
    const find = await User.findOne({name: 'son'});
    assert(find.name === 'son');
  });


  //increment which is a one way process
  it('A user can have their postcount incremented by 2', async () => {
      // increment it by 3
      await User.update({name: 'Neil'}, {$inc: { likes: 3}});
      const updateInc = await User.findOne({name: 'Neil'});
      assert(updateInc.likes === 23);
  });
});
