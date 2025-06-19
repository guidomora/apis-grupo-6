const Bookings = require("../../models/booking");
const User = require("../../models/user");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

//CREAR USUARIO
const createUser = async (req, res) => {
  try {
    const { name, lastName, mail, password, birth, role } = req.body;

    const emailExists = await User.findOne({ mail });
    if (emailExists) {
      return res.status(400).json({
        message: "El correo ya esta registrado",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial",
      });
    }

    const user = new User({ name, lastName, mail, password, birth, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({
      message: "Usuario creado correctamente",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

//LOGIN USUARIO
const loginUser = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

//CONTRASEÑA OLVIDADA
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ mail: email });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    //Esto sería una simulacion de envio de correo, tendriamos que implementar al
    return res.status(200).json({
      message: "Se ha enviado un correo con instrucciones",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// OBTENER USUARIO SEGUN SU ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: "TRAINER_ROLE" });

    if (trainers.length == 0) {
      return res.status(200).json({ message: "No hay entrenadores" });
    }

    return res.status(200).json({ trainers });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const getAllServicesFromUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const bookings = await Bookings.find({ user: userId });

    if (bookings.length == 0) {
      return res.status(200).json({ message: "No hay servicios contratados" });
    }

    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  getUserById,
  getAllTrainers,
  getAllServicesFromUser,
};
