const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
    listSocialLinks,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
} = require('../controllers/socialLinkController')

router.get('/', listSocialLinks)
router.post('/', auth, createSocialLink)
router.put('/:id', auth, updateSocialLink)
router.delete('/:id', auth, deleteSocialLink)

module.exports = router
