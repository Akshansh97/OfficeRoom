const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// POST /api/register
router.post('/register', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in /register:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// POST /api/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User not found with this email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login successful", username: user.username });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /api/users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // exclude password field
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error while fetching users" });
    }
});

module.exports = router;
