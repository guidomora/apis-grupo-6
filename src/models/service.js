const { Schema, model } = require("mongoose");

//Modelo para el servicio
const ServiceSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
    enum: ["GYM", "BOXEO", "ESTIRAMIENTO", "YOGA", "PILATES", "FUNCIONAL"],
  },
  zone: {
    type: String,
    required: [true, "zone is required"],
    enum: [
      "PALERMO",
      "BELGRANO",
      "CABALLITO",
      "ALMAGRO",
      "PARQUE_PATRICIOS",
      "BOEDO",
      "AVELLANEDA",
      "ONLINE"
    ],
  },
  mode: {
    type: String,
    required: [true, "mode is required"],
    enum: ["PRESENCIAL", "ONLINE"],
  },
  duration: {
    type: Number,
    required: [true, "duration is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  date: {
    // yyyy-mm-dd
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  
  views: {
    type: Number,
    default: 0,
  },

  sharedFiles: {
    type: [String], // array de URLs
    default: [],
  },

  trainer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ServiceSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("Service", ServiceSchema);
