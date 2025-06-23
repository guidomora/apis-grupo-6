const Bookings = require("../../models/booking");
const User = require("../../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { sendResetEmail } = require('../../helpers/mail/nodeMailer');

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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
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
  const { mail } = req.body;

  const user = await User.findOne({ mail });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const resetLink = `http://localhost:5173/reset-password/${token}`;
  await sendResetEmail(user.mail, resetLink);

  return res.status(200).json({ message: "Enlace de recuperación enviado" });
};
 
//RESETEAR CONTRASEÑA
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un carácter especial",
      });
    }

    user.password = newPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    return res.status(400).json({ message: "Token inválido o expirado" });
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

//OBTENER A TODOS LOS ENTRENADORES
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

//OBTENER TODOS LOS SERVICIOS DE LOS ENTRENADORES
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
  forgotPassword,
  resetPassword,
};
