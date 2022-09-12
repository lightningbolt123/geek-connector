const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// @route   POST api/users
// @desc    Resgister user
// @access  Public
router.post('/', [
    check('name','Name is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    check('password','Password should be six characters or more').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists on the database
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists'}]});
        }

        // Create user avatar using gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        // Create a new instance of the user
        user = new User({
            name,
            email,
            password,
            avatar
        });

        // Update the user password with the hash of the plain text password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        // First create the payload for signing the jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };

        // Sign jsonwebtoken
        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token});
            }
        )

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;