const express = require('express')
const router = express.Router()
const { getProfile, updateProfile } = require('../controllers/profileController')
const auth = require('../middleware/authMiddleware')

router.get('/', getProfile)
router.put('/', updateProfile)  // Temporarily remove auth for testing

module.exports = router
