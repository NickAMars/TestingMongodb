const assert = require('assert');
const User =  require('../src/user');

describe('Virtual type', ()=>{
  it('postCount returns number of posts',async () =>{
    const dovber = new User({
      name: 'Dovber',
      posts: [{title: 'Is my best friend'}]
    });
    await dovber.save();
    const friend  = await User.findOne({ name: 'Dovber'});

    assert(friend.postCount === 1);
  });
});
