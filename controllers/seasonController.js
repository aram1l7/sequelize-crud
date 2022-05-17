const { Season, Episode } = require("../models");

const getAll = async (req, res) => {
  try {
    const seasons = await Season.findAll({
      include: [
        {
          model: Episode,
          as: "episodes",
          attributes: ["title", "about"],
        },
      ],
      order: [["id", "ASC"]],
    });
    return res.status(200).json(seasons);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const create = async (req, res) => {
  try {
    const newSzn = await Season.create({
      title: req.body.title,
      description: req.body.description,
      movie_id: req.params.movieId,
    });
    return res.status(200).json(newSzn);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const show = async (req, res) => {
  try {
    const season = await Season.findByPk(req.params.id);
    if (!season) {
      return res.status(404).json({ message: "Season not Found" });
    }
    return res.status(200).json(season);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req, res) => {
  try {
    const season = await Season.findByPk(req.params.id);
    if (!season) {
      return res.status(404).json({ message: "Season Not Found" });
    }
    await season.update({
      ...season,
      ...req.body,
    });
    res.status(200).json(season);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req, res) => {
  try {
    const season = await Season.findByPk(req.params.id);
    if (!season) {
      return res.status(400).json({ message: "Season Not Found" });
    }
    await season.destroy();
    res.status(200).json(season);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAll, create, show, update, destroy };
