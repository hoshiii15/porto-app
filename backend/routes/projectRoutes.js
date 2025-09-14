const express = require('express')
const router = express.Router()
const multer = require('multer')
const mongoose = require('mongoose')
const { GridFSBucket } = require('mongodb')
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

// GridFS storage for MongoDB
let gfsBucket;
mongoose.connection.once('open', () => {
    gfsBucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
});

// Multer memory storage to handle files in memory before storing in GridFS
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Custom middleware to handle GridFS upload
const uploadToGridFS = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const filename = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
    
    try {
        const uploadStream = gfsBucket.openUploadStream(filename, {
            metadata: {
                originalName: req.file.originalname,
                contentType: req.file.mimetype
            }
        });

        uploadStream.end(req.file.buffer);
        
        uploadStream.on('finish', () => {
            req.file.filename = filename;
            req.file.id = uploadStream.id;
            next();
        });

        uploadStream.on('error', (error) => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
};

// Route to serve images from GridFS
router.get('/image/:filename', async (req, res) => {
    try {
        const files = await gfsBucket.find({ filename: req.params.filename }).toArray();
        
        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const file = files[0];
        
        // Set proper content type
        res.set('Content-Type', file.metadata?.contentType || 'image/jpeg');
        
        // Create download stream
        const downloadStream = gfsBucket.openDownloadStreamByName(req.params.filename);
        downloadStream.pipe(res);
        
        downloadStream.on('error', (error) => {
            res.status(404).json({ message: 'Image not found' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving image' });
    }
});

router.get('/', listProjects)
router.get('/:id', getProject)
router.post('/', auth, upload.single('image'), uploadToGridFS, createProject)
router.put('/:id', auth, upload.single('image'), uploadToGridFS, updateProject)
router.delete('/:id', auth, deleteProject)
router.post('/fix-tags', auth, fixTags)

module.exports = router
