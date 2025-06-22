const { Schema, model } = require("mongoose");

//Modelo para la reserva/booking
const BookingSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Booking", BookingSchema);
