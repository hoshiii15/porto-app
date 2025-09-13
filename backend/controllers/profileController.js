const Profile = require('../models/Profile')

exports.getProfile = async (req, res) => {
    const profile = await Profile.findOne()
    res.json(profile || {})
}

exports.updateProfile = async (req, res) => {
    const data = req.body
    let profile = await Profile.findOne()
    if (!profile) profile = new Profile(data)
    else Object.assign(profile, data)
    await profile.save()
    res.json(profile)
}
