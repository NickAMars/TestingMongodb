const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    validate:{
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  likes:Number,
  // postCount: Number,
  posts: [PostSchema], //embedded resource
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

userSchema.virtual('postCount').get( function(){
  return this.posts.length;
});
/*
  before remove is called
  remove all blogPost
*/
userSchema.pre('remove', async function(next){
  const BlogPost = mongoose.model('blogPost');
  await BlogPost.remove({ _id: { $in : this.blogPosts }});
  next();
});

const User = mongoose.model('user',  userSchema);
module.exports = User;
