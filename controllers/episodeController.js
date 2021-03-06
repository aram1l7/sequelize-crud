const { Season, Episode } = require("../models");

const getAll = async (req, res) => {
  try {
    const episodes = await Episode.findAll();
    return res.status(200).json(episodes);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const create = async (req, res) => {
  try {
    const episodes = await Episode.findAll({
      where: {
        season_id: req.params.seasonId,
      },
    });
    let nextId = (+req.params.seasonId + 1).toString();
    const episodeData = {
      title: req.body.title,
      about: req.body.about,
    };
    if (!req.body.title || !req.body.about) {
      return res
        .status(400)
        .json("Cannot create an episode with empty title or about field");
    }
    const currentSeason = await Season.findByPk(req.params.seasonId);

    if (!currentSeason) {
      return res.status(404).send("There is no season with entered id.Aborted");
    }
    if (episodes.length > 22) {
      const nextSeason = await Season.findByPk(nextId);
      if (nextSeason) {
        const nextSeasonEpisode = await Episode.create({
          ...episodeData,
          season_id: nextId,
        });
        return res.status(201).json(nextSeasonEpisode);
      }
      const movieId = currentSeason?.dataValues.movie_id;
      const newSzn = await Season.create({
        title: `Season ${nextId}`,
        description: "asdasdasd",
        movie_id: movieId,
      });
      const newSeasonId = newSzn.dataValues.id;
      const newEpisode = await Episode.create({
        ...episodeData,
        season_id: newSeasonId,
      });
      return res.status(201).json(newEpisode);
    }
    const new_episode = await Episode.create({
      ...episodeData,
      season_id: req.params.seasonId,
    });
    return res.status(201).json(new_episode);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const show = async (req, res) => {
  try {
    const episode = await Episode.findByPk(req.params.id);
    if (!episode) {
      return res.status(404).json({ message: "Episode not Found" });
    }
    return res.status(200).json(episode);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req, res) => {
  try {
    const episode = await Episode.findByPk(req.params.id);
    if (!episode) {
      return res.status(404).json({ message: "Episode Not Found" });
    }
    if (!req.body.title || !req.body.about) {
      return res
        .status(400)
        .json("Cannot update episode with empty title or about field");
    }
    await episode.update({
      ...episode,
      ...req.body,
    });
    res.status(200).json(episode);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req, res) => {
  try {
    const episode = await Episode.findByPk(req.params.id);
    if (!episode) {
      return res.status(400).json({ message: "episode Not Found" });
    }
    await episode.destroy();
    res.status(200).json(episode);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAll, create, show, update, destroy };
