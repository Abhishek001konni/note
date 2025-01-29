const Note = require("../models/Note");

/* Get all notes */
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error("Error getting notes: ", err.message);
    res.status(500).json({
      error: "failed to get notes",
      details: err.message,
    });
  }
};

/* Get a single note */
const getNoteById = async (req, res) => {
  res.json(req.note);
};

/* Create a new note */
const createNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error("Error creating note: ", err.message);
    res.status(400).json({
      error: "failed to create note",
      details: err.message,
    });
  }
};

/* Update a note */
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (title) req.note.title = title;
    if (content) req.note.content = content;

    const updatedNote = await req.note.save();
    res.json(updatedNote);
  } catch (err) {
    console.error("Error updating note: ", err.message);
    res.status(400).json({
      error: "failed to update note",
      details: err.message,
    });
  }
};

/* Delete a note */
const deleteNote = async (req, res) => {
  try {
    await req.note.deleteOne();
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting note: ", err.message);
    res.status(500).json({
      error: "failed to delete note",
      details: err.message,
    });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
