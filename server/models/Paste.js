const mongoose = require('mongoose');

const pasteSchema = new mongoose.Schema({
    content: { type: String, required: true},
    expiresAt: { type: Date, default: null},
}, { 
    timestamps: true 
   }
);

pasteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Paste', pasteSchema);