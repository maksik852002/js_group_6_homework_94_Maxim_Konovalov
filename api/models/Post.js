const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: function() {
      return !this.image;
    }
  },
  image: {
    type: String,
    required: function() {
      return !this.text;
    }
  },
  tags: [String],
  datetime: {
    type: Date,
    default: Date.now
  }
},
{
  versionKey: false
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;