var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

var Post = mongoose.model("Post", postSchema);
module.exports = Post;
