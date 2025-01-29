const mongoose = require("mongoose");

/* generic middleware to fetch a document by ID from any Mongo model*/

const getById = (Model, key) => async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: "Invalid ID",
      details: `${key} ID ${id} is invalid`,
    });
  }
  try {
    const document = await Model.findById(id);
    if (!document) {
      return res.status(404).json({ error: `${key} not found` });
    }
    req[key] = document;
    next();
  } catch (err) {
    console.error(`Error fetching ${key}: `, err.message);
    res.status(500).json({
      error: `failed to get ${key} ${req.params.id}`,
      details: err.message,
    });
  }
};

module.exports = getById;
