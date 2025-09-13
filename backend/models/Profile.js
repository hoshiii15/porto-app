const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: String,
    title: String,
    description: String,
    bio: String,
    email: String,
    phone: String,
    location: String,
    city: String,
    country: String,
    profession: String,
    yearsExperience: Number,
    avatarUrl: String,
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        website: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)
