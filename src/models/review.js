const { Schema, model } = require("mongoose");

// Modelo de la base de datos para review
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
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: false, // este campo ya lo usás para relacionar la reseña con un servicio
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Respuesta del entrenador (opcional)
  trainerReply: {
    text: {
      type: String,
      maxlength: 500,
      default: null,
    },
    repliedAt: {
      type: Date,
      default: null,
    },
  },
});

// ÍNDICE ÚNICO para evitar duplicados de review por autor + entrenador + servicio
ReviewSchema.index({ author: 1, trainer: 1, service: 1 }, { unique: true });

ReviewSchema.methods.toJSON = function () {
  const { __v, password, ...review } = this.toObject();
  return review;
};

module.exports = model("Review", ReviewSchema);
