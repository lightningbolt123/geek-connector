const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const router = express.Router();

//@route    GET/api/auth
//@desc     Get user
//@access   private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route    POST/api/auth
//@desc     Login user
//@access   private
router.post('/', [
    check('email','Email is required').isEmail(),
    check('password','Enter valid password').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()){
            return res.status(401).json({ errors: errors.array() });
        }
    
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
    
        if (!user) {
            return res.status(401).json({ errors : [{ msg: 'Invalid credentials '}]});
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }]});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.jwtSecret , { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        })
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
})

module.exports = router;