const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
going to be use as a sub document
*/
const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;
