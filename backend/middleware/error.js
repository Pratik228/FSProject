const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  // Handle different types of errors
  if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  }

  if (err.name === "CastError") {
    return res.status(404).send({ error: "Resource not found" });
  }

  // Default to 500 if no specific error handling is defined
  res.status(500).send({ error: "Something went wrong" });
};

module.exports = errorHandler;
