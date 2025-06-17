const { Schema, model } = require("mongoose");

const BookingSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // El que contrata
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service", // El servicio contratado
    required: true,
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "User", // El entrenador que lo brinda
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
    default: "PENDING",
  },
  date: {
    type: Date, // Cuándo se programó la clase/servicio
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Booking", BookingSchema);
