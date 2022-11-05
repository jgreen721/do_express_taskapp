const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post_schema = new Schema(
  {
    post: {
      type: String,
      require: true,
    },
    postedBy: {
      type: String,
      default: "anonymous",
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", post_schema);
