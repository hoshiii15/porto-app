require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const projectRoutes = require('./routes/projectRoutes')
const socialLinkRoutes = require('./routes/socialLinkRoutes')
const skillRoutes = require('./routes/skillRoutes')

const app = express()

// CORS configuration for production
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://porto-app-iota.vercel.app',
        'https://porto-app.vercel.app',
        /vercel\.app$/,  // Allow all vercel.app subdomains
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/social-links', socialLinkRoutes)
app.use('/api/skills', skillRoutes)

const PORT = process.env.PORT || 5000
const mongoUri = process.env.MONGO_URI
if (!mongoUri) {
    console.error('\nMissing MONGO_URI environment variable.\nPlease copy backend/.env.example to backend/.env and set MONGO_URI (or set the env var before starting).\nExample local value: mongodb://127.0.0.1:27017/portfolio\n')
    process.exit(1)
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err && err.message ? err.message : err)
        process.exit(1)
    })
