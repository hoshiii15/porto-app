const express = require('express');
const router = express.Router();
const Statistics = require('../models/Statistics');

// GET statistics
router.get('/', async (req, res) => {
    try {
        let stats = await Statistics.findOne();
        if (!stats) {
            // Create default statistics if none exist
            stats = new Statistics({});
            await stats.save();
        }
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT update statistics
router.put('/', async (req, res) => {
    try {
        let stats = await Statistics.findOne();
        if (!stats) {
            stats = new Statistics(req.body);
        } else {
            Object.assign(stats, req.body);
        }
        await stats.save();
        res.json(stats);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
