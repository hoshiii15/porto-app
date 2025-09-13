const SocialLink = require('../models/SocialLink')

exports.listSocialLinks = async (req, res) => {
    try {
        const socialLinks = await SocialLink.find().sort({ createdAt: -1 })
        res.json(socialLinks)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching social links', error: error.message })
    }
}

exports.createSocialLink = async (req, res) => {
    try {
        const { name, url } = req.body

        if (!name || !url) {
            return res.status(400).json({ message: 'Name and URL are required' })
        }

        const socialLink = new SocialLink({ name, url })
        await socialLink.save()
        res.status(201).json(socialLink)
    } catch (error) {
        res.status(500).json({ message: 'Error creating social link', error: error.message })
    }
}

exports.updateSocialLink = async (req, res) => {
    try {
        const { id } = req.params
        const { name, url } = req.body

        const socialLink = await SocialLink.findByIdAndUpdate(
            id,
            { name, url },
            { new: true, runValidators: true }
        )

        if (!socialLink) {
            return res.status(404).json({ message: 'Social link not found' })
        }

        res.json(socialLink)
    } catch (error) {
        res.status(500).json({ message: 'Error updating social link', error: error.message })
    }
}

exports.deleteSocialLink = async (req, res) => {
    try {
        const { id } = req.params

        const socialLink = await SocialLink.findByIdAndDelete(id)

        if (!socialLink) {
            return res.status(404).json({ message: 'Social link not found' })
        }

        res.json({ message: 'Social link deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting social link', error: error.message })
    }
}
