const jwt = require('jsonwebtoken');
require('dotenv').config();
//const config = require('config');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ msg: 'Access denied'});
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.jwtSecret);

        // Update the request object with the decoded token
        req.user = decoded.user;

        // Move ahead to protected route
        next();
    } catch (err) {
        // Return an error if the token is not valid
        return res.status(401).json({ msg: 'Access denied' });
    }
};