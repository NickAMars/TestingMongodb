const mongoose = require('mongoose');
const assert = require('assert');
const User =  require('../src/user');
const BlogPost =  require('../src/blogPost');


describe('Middleware', () => {
  let dovber, blogPost ;
  beforeEach( async ()=>{
    dovber = new User({ name: 'Dovber'});
    blogPost = new BlogPost({ title: 'Thanks', content: 'we drink until morning (blogPost)'});
    dovber.blogPosts.push(blogPost);
    await Promise.all([dovber.save(), blogPost.save()]);
  });

  /*
    mongoose function
     BlogPost.count();
  */
  it('user clean up dangling blogposts on remove', async ()=>{
    await dovber.remove();
    const count = await BlogPost.count();
    // console.log(count);
    assert(count === 0 );

  });

})
