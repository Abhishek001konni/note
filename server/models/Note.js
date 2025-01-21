const  mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true}
    },
    {
        timestamps: true
    }
);


// Add a pre-save hook to trim the title and content
noteSchema.pre('save', function(next) {
    this.title = this.title.trim();
    this.content = this.content.trim();
    next();
});

module.exports = mongoose.model('Note', noteSchema);



