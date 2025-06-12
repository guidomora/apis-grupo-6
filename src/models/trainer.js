const { Schema, model } = require("mongoose");

// modelo de la base de datos
const TrainerSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  mail: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    required: true,
    enum: ["USER_ROLE", "TRAINER_ROLE"],
  },
  birth:{
    type:Date,
    required:true
  }
});

TrainerSchema.methods.toJSON = function () {
  const { __v, password, ...trainer } = this.toObject();
  return trainer;
};

module.exports = model("Trainer", TrainerSchema);
