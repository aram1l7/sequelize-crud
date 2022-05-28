const { User, Movie, UserMovies } = require("../models");

const getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Movie,
          as: "movies",
          attributes: ["title", "description"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const create = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Movie,
          as: "movies",
          attributes: ["title", "description"],
          through: {
            attributes: ["user_id", "movie_id"],
          },
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (req.body.name.length < 1 || !req.body.name) {
      return res.status(400).json("Updated name shouldnt be empty");
    }
    await user.update({
      ...user,
      ...req.body,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    await UserMovies.destroy({
      where: { user_id: req.params.id },
    });
    await user.destroy();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const subscribeToMovie = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    await UserMovies.create({
      user_id: req.params.userId,
      movie_id: req.params.movieId,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  getAll,
  create,
  show,
  update,
  destroy,
  subscribeToMovie,
};
