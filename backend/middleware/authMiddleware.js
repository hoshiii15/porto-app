const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ message: 'Unauthorized' })
    const token = auth.replace('Bearer ', '')
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}
