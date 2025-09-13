const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

exports.login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
}

// Optional register for initial setup
exports.register = async (req, res) => {
    const { username, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = new User({ username, passwordHash: hash })
    await user.save()
    res.json({ ok: true })
}
