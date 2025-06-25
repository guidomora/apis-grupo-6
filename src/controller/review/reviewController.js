const Review = require("../../models/review");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const mongoose = require("mongoose");

// CREAR UNA RESEÑA
const createReview = async (req, res) => {
  try {
    const { rating, comment, author, trainer, service } = req.body;

    if (!rating || !comment || !author || !trainer || !service) {
      return res.status(400).json({
        message: "Faltan campos requeridos",
      });
    }

    const [authorExists, trainerExists] = await Promise.all([
      User.findById(author),
      User.findById(trainer),
    ]);

    if (!authorExists || !trainerExists) {
      return res.status(400).json({
        message: "Usuario o entrenador inexistente",
      });
    }

    const bookingExists = await Booking.findOne({
      user: author,
      trainer,
      service,
      status: "CONFIRMED",
    });

    if (!bookingExists) {
      return res.status(403).json({
        message: "Solo podés comentar si contrataste esa clase confirmada",
      });
    }

    const alreadyReviewed = await Review.findOne({ author, trainer, service });
    if (alreadyReviewed) {
      return res.status(400).json({
        message: "Ya dejaste una reseña para esta clase con este entrenador",
      });
    }

    const review = new Review({ rating, comment, author, trainer, service });
    await review.save();

    return res.status(201).json({
      message: "Reseña creada correctamente",
      review,
    });
  } catch (error) {
    console.error("Error al crear reseña:", error);
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

    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Entrenador no encontrado" });
    }

    // Manejo seguro del populate
    const reviews = await Review.find({ trainer: trainerId })
      .populate("author", "name lastName")
      .populate({
        path: "service",
        select: "description category",
        strictPopulate: false, // ⚠️ evita error si el servicio ya no existe
      });

    // Filtramos reseñas con service = null
    const filteredReviews = reviews.filter(r => r.service !== null);

    return res.status(200).json({ reviews: filteredReviews });
  } catch (error) {
    console.error("Error en getTrainerReviews:", error);
    return res.status(500).json({
      message: "Error al obtener las reseñas del entrenador",
      error: error.message,
    });
  }
};


module.exports = {
  createReview,
  getTrainerReviews,
};
