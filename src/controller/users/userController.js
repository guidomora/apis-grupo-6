const Bookings = require("../../models/booking");
const User = require("../../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { sendResetEmail } = require('../../helpers/mail/nodeMailer');

// CREAR USUARIO
const createUser = async (req, res) => {
  try {
    const { name, lastName, mail, password, birth, role } = req.body;

    const emailExists = await User.findOne({ mail });
    if (emailExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "La contraseña debe tener entre 8 y 15 caracteres, incluyendo mayúscula, número y carácter especial",
      });
    }

    const user = new User({ name, lastName, mail, password, birth, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: "Usuario creado correctamente",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// LOGIN USUARIO
const loginUser = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// RECUPERAR CONTRASEÑA
const forgotPassword = async (req, res) => {
  const { mail } = req.body;

  try {
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
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el email", error: error.message });
  }
};

// RESETEAR CONTRASEÑA
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
          "La contraseña debe tener entre 8 y 15 caracteres, incluyendo mayúscula, número y carácter especial",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(400).json({ message: "Token inválido o expirado" });
  }
};

// OBTENER USUARIO POR ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ user }); // ✅ CORREGIDO
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// ACTUALIZAR USUARIO
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// OBTENER ENTRENADORES
const getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: "TRAINER_ROLE" });

    if (!trainers.length) {
      return res.status(200).json({ message: "No hay entrenadores" });
    }

    res.status(200).json({ trainers });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// OBTENER SERVICIOS CONTRATADOS POR USUARIO
const getAllServicesFromUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const bookings = await Bookings.find({ user: userId });
    if (!bookings.length) {
      return res.status(200).json({ message: "No hay servicios contratados" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserById,
  updateUser,
  getAllTrainers,
  getAllServicesFromUser,
};
