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

module.exports = {
  getStationsData,
};
