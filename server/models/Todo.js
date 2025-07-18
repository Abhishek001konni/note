const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true, trim: true, maxlength: 200},
    completed: { type: Boolean, default: false },

}, { timestamps: true});




module.exports = mongoose.model('Todo', todoSchema);
