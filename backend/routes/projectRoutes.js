const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const auth = require('../middleware/authMiddleware')
const {
    listProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    fixTags,
} = require('../controllers/projectController')

// simple disk storage for uploads
const storage = multer.diskStorage({
    // store uploads in backend/uploads
    destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-')),
})
const upload = multer({ storage })

router.get('/', listProjects)
router.get('/:id', getProject)
router.post('/', auth, upload.single('image'), createProject)
router.put('/:id', auth, upload.single('image'), updateProject)
router.delete('/:id', auth, deleteProject)
router.post('/fix-tags', auth, fixTags)

module.exports = router
