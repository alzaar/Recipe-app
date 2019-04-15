const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  recipe_id: {
    type: String,
    isRequired: true
  },
  text: {
    type: String,
    isRequired: true
  },
  name: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const  Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
