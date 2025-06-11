const userService = require("../../services/userService");
const User = require("../../models/user");

exports.getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};

exports.getUserById = (req, res) => {
  const user = userService.getUserById(req.prams.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};


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
 const loginUser =  async (req, res) => {
  try {
    const {mail, password} = req.body;

    //Buscar usuario por correo
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado"
      });
    }

    //Comparar conntraseña
    if (user.password !== password) {
      return res.status(401).json({
        message: "Contraseña incorrecta"
      });
    }

    //Si no ocurre nada raro, se loguea exitosamente
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      user
    });

  } catch (error) {
     console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
    
  }

}







module.exports = {
  createUser,
  loginUser,
};
