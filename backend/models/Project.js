const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    tags: [String],
    liveUrl: String,
    codeUrl: String,
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)
