const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied, no token' });
    }
    // Verify token
    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Authorization denied, invalid token' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error('Something went wrong with check-auth middleware');
        res.status(500).send('Server Error');
    }
};
