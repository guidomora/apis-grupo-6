const { Schema, model } = require("mongoose");

// Modelo de la base de datos para usuario
const UserSchema = Schema({
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
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
  },
  role: {
    type: String,
    required: true,
    enum: ["USER_ROLE", "TRAINER_ROLE"],
  },
  birth: {
    type: Date,
    required: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
