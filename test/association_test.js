const mongoose  = require('mongoose');
const assert = require('assert');
const User      = require('../src/user');
const Comment   = require('../src/comment');
const BlogPost  = require('../src/blogPost');

describe('Association', ()=>{
  let dovber, blogPost, comment;
  beforeEach( async () => {
    dovber = new User({ name: 'Dovber'});
    blogPost = new BlogPost({ title: 'Thank Life Your Alive', content: 'we drink until morning (blogPost)'});
    comment = new Comment({ content: 'Congrats on greats i know you can (post)'})


    dovber.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = dovber;
    await Promise.all([dovber.save(), blogPost.save(), comment.save()]);
  });

  it('saves a relation between a user and a blogpost', async () =>{
    const user = await User.findOne({name: 'Dovber'}).populate('blogPosts');
    assert(user.blogPosts[0].title === 'Thank Life Your Alive');
  });


    it('saves a full relation graph', async () =>{
      const user = await User.findOne({name: 'Dovber'}).populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate:{
            path: 'user',
            model: 'user'
          }
        }
      });
      // console.log(user['blogPosts'][0]['comments'][0][user]);
      // assert(user.blogPosts[0].title === 'Thank Life Your Alive');
      assert(user.name === 'Dovber');
      assert(user['blogPosts'][0].title === 'Thank Life Your Alive');
      assert(user['blogPosts'][0]['comments'][0].content === 'Congrats on greats i know you can (post)');
      assert(user['blogPosts'][0]['comments'][0]['user'].name === 'Dovber');
    });

});
