<h1>Testing Mongodb database with mocha</h1>

Testing
mongoose connection
CRUD operation
Validations
Virtual-type
Middlewares
Query Modifiers

x in mocha can be use to make a test pending


// takes operations and do them in parallel
await Promise.all([])

//checks if the value is valid
const validateResult = user.validateSync();
//if not gets the error
const { message } = validationResult.errors.name;
//example of vertual-type. is not a store item in the database
userSchema.virtual('postCount').get( function(){
  return this.posts.length;
});

// can use (pre or post) ex of a middleware
userSchema.pre('remove', async function(next){
  const BlogPost = mongoose.model('blogPost');
  await BlogPost.remove({ _id: { $in : this.blogPosts }});
  next();
});

// the populate modifier is use to get the reference objects
example--1:
const user = await User.findOne({name: 'Dovber'}).populate('blogPosts');

example--2: is an example of inseption (dream within  a dream)
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
