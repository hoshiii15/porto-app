const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    color: {
        type: String,
        required: true,
        default: 'from-blue-500 to-blue-600'
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
