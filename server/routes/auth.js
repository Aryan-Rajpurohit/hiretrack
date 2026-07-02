const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

// Register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //check if user already exists
        const existing = await User.findOne({ email })
        if (existing) {
            return res.status(400).json({ message: "Email already registered" })
        }

        //encrypt password
        const hashed = await bcrypt.hash(password, 10)

        //save user
        const user = await User.create({ name, email, password: hashed })

        //create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({ token, name: user.name })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invald credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ token, name: user.name })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router;