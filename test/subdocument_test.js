const assert = require('assert');
const User =  require('../src/user');
// const extend = require('mongoose-schema-extend');

describe('Subdocuments', ()=>{
  it('can create a subdocument', async () =>{
    // make instance
    const abby = new User({
      name:  'Abby',
      posts: [{title: 'Great Women' }, {title: 'Married'}]
    });
    await abby.save();
    // find user in the database for testing
    const user = await User.findOne({name: 'Abby'});
    assert(user.posts.length === 2);
  });

  it('can add subdocuments to an existing record', async () =>{
    // make an instance
    const leo = new User({name: 'Leo',posts: []});
    await leo.save();
    // putting a post inside of the user object
    leo.posts.push({title: 'Thank you for taking care of me'});
    // saving it to the date base
    await leo.save();
    //find user in the data base for testing
    const user = await User.findOne({ name: 'Leo'});
    assert(user.posts[0].title === 'Thank you for taking care of me');
  });
});

it('can remove subdocuments to an existing record', async () =>{
  // make an instance
  const denis = new User({name:'Denis',posts: []});
  await denis.save();
  /*
    Saving subdocument post to instance
  */
  denis.posts.push({title: 'Stab me in the back'});
  await denis.save();
  /*
    find index of what i want to delete user (alternative)
    const index = denis.posts.findIndex((elem) =>
     elem['title'] === 'Stab me in the back'
    );
    denis.posts.splice(index , 1);
    update changes with the save method
  */
  const post  = denis.posts[0];
  post.remove();
  await denis.save();
  /*
    find value in database for test and assert it
  */
  const user = await User.findOne({ name: 'Denis'});
  assert(user.posts.length === 0);

});
