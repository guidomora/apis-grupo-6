const Review = require("../../models/review");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const mongoose = require("mongoose");

// CREAR UNA RESEÑA
const createReview = async (req, res) => {
  try {
    const { rating, comment, author, trainer, service } = req.body;

    // Validar existencia
    const authorExists = await User.findById(author);
    const trainerExists = await User.findById(trainer);
    if (!authorExists || !trainerExists) {
      return res.status(400).json({ message: "Usuario o entrenador inexistente" });
    }

    // Verificar que haya contratado esa clase con ese entrenador y que esté confirmada
    const bookingConfirmed = await Booking.findOne({
      user: author,
      trainer,
      service,
      status: "CONFIRMED"
    });

    if (!bookingConfirmed) {
      return res.status(403).json({
        message: "Solo podés reseñar si tu clase fue confirmada"
      });
    }

    // Evitar duplicados por combinación única
    const review = new Review({ rating, comment, author, trainer, service });
    await review.save();

    return res.status(201).json({
      message: "Reseña creada correctamente",
      review
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Ya dejaste una reseña para esta clase"
      });
    }

    console.error("Error al crear reseña:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};

// OBTENER TODAS LAS RESEÑAS DE UN ENTRENADOR
const getTrainerReviews = async (req, res) => {
  try {
    const trainerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(trainerId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Entrenador no encontrado" });
    }

    const reviews = await Review.find({ trainer: trainerId })
      .sort({ createdAt: -1 })
      .populate("author", "name lastName")
      .select("rating comment createdAt reply");

    return res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error en getTrainerReviews:", error);
    return res.status(500).json({
      message: "Error al obtener las reseñas del entrenador",
      error: error.message
    });
  }
};

// RESPONDER UNA RESEÑA
const replyToReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { reply } = req.body;
    const trainerId = req.user.id; // del token JWT

    if (!reply || reply.trim() === "") {
      return res.status(400).json({ message: "La respuesta no puede estar vacía" });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    if (review.trainer.toString() !== trainerId) {
      return res.status(403).json({ message: "No estás autorizado para responder esta reseña" });
    }

    review.reply = reply;
    await review.save();

    res.status(200).json({ message: "Respuesta agregada", review });
  } catch (error) {
    console.error("Error al responder reseña:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};


module.exports = {
  createReview,
  getTrainerReviews,
  replyToReview
};
