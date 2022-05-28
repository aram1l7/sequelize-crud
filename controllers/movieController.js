const { UserMovies, Movie, User, Season } = require("../models");

const getAll = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Season,
          as: "seasons",
          attributes: ["id", "title"],
        },
      ],
    });
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const create = async (req, res) => {
  try {
    const newMovie = await Movie.create({
      title: req.body.title,
      description: req.body.description,
    });
    return res.status(201).json(newMovie);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const show = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: [
        { model: Season, as: "seasons", attributes: ["title", "description"] },
      ],
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not Found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(400).json({ message: "Movie Not Found" });
    }
    if (!req.body.title || !req.body.description) {
      return res
        .status(400)
        .json("Cannot update movie with empty title or description");
    }
    await movie.update({
      ...movie,
      ...req.body,
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(400).json({ message: "Movie Not Found" });
    }
    await UserMovies.destroy({
      where: { movie_id: req.params.id },
    });
    await Season.destroy({
      where: { movie_id: req.params.id },
    });
    await movie.destroy();
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAll, create, show, update, destroy };
