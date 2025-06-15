const { Schema, model } = require("mongoose");

// modelo de la base de datos
const ReviewSchema = Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.methods.toJSON = function () {
  const { __v, password, ...review } = this.toObject();
  return review;
};

module.exports = model("Review", ReviewSchema);
