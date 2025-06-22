const Review = require("../../models/review");
const User = require("../../models/user");
const mongoose = require("mongoose");

// CREAR UNA RESEÑA
const createReview = async (req, res) => {
  try {
    const { rating, comment, author, trainer } = req.body;

    const authorExists = await User.findOne({ _id: author });
    const trainerExists = await User.findOne({ _id: trainer });

    if (!authorExists || !trainerExists) {
      return res.status(400).json({
        message: "Usuario o entrenador inexistes",
      });
    }

    const review = new Review({ rating, comment, author, trainer });
    await review.save();
    res.status(201).json({
      message: "Review creada correctamente",
      review,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// OBTENER REVIEWS DE UN ENTRENADOR
const getTrainerReviews = async (req, res) => {
  try {
    const trainerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(trainerId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const trainerExists = await User.findOne({ _id: trainerId });

    if (!trainerExists) {
      return res.status(400).json({
        message: "Entrenador inexiste",
      });
    }

    const reviews = await Review.find({ trainer: trainerId });

    if (reviews.length == 0) {
      return res.status(200).json({
        message: "El entrenador no cuenta con reseñas",
      });
    }

    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las reseñas",
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  getTrainerReviews,
};
