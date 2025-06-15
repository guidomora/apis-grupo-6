const User = require("../../models/user");
const mongoose = require("mongoose");


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

    const user = new User({ name, lastName, mail, password, birth, role });
    await user.save();
    res.status(201).json({
      message: "Usuario creado correctamente",
      user,
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

    //Buscar usuario por correo
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    //Comparar conntraseña
    if (user.password !== password) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }

    //Si no ocurre nada raro, se loguea exitosamente
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      user,
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



module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  getUserById,
};
