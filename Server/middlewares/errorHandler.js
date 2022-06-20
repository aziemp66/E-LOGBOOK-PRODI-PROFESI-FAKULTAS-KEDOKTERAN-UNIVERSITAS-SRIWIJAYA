const errorHandler = (error, req, res, next) => {
  if (!error) return res.status(500).json({ message: "Something went wrong" });
  console.log(error.message);
  res.json({
    error: error.message,
  });
};

module.exports = errorHandler;
