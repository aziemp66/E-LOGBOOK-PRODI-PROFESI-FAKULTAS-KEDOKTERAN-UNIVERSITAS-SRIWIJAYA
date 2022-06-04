const db = require("../models");

const getStationsData = async (req, res, next) => {
  let stations;
  try {
    stations = await db.Station.findAll();
  } catch (error) {
    return next(error);
  }

  res.json(stations);
};

const getCompetencesData = async (req, res, next) => {
  const { station } = req.params;

  let diseases;
  let skills;
  try {
    diseases = await db.Disease.findAll({
      where: {
        station,
      },
    });

    skills = await db.Skill.findAll({
      where: {
        station,
      },
    });
  } catch (error) {
    return next(error);
  }

  res.json({
    diseases,
    skills,
  });
};

module.exports = {
  getStationsData,
  getCompetencesData,
};
