const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    yearsExperience: {
        type: Number,
        default: 3
    },
    successRate: {
        type: Number,
        default: 100,
        min: 0,
        max: 100
    },
    totalProjects: {
        type: Number,
        default: 0
    },
    totalCategories: {
        type: Number,
        default: 4
    },
    supportAvailability: {
        type: String,
        default: '24/7'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Statistics', statisticsSchema);
