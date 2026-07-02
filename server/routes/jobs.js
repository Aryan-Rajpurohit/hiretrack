const express = require("express")
const Job = require("../models/Job")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

// All routes below are protected (need login)

//Get all jobs of logged in user
router.get("/", protect, async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 })
        res.json(jobs)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

// ADD a new job
router.post("/", protect, async (req, res) => {
    console.log("POST /jobs hit");
    console.log("User:", req.user);
    console.log("Body:", req.body);
    const { company, role, status, source, jobLink, notes, appliedDate } = req.body;
    try {
        const job = await Job.create({
            user: req.user.id,
            company,
            role,
            status,
            source,
            jobLink,
            notes,
            appliedDate,
        });
        res.status(201).json(job);
    } catch (err) {
        console.error("Job create error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Update a job (edit or drag to new status)
router.put("/:id", protect, async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true } // return updated job
        )
        res.json(job)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

// Delete a job
router.delete("/:id", protect, async (req, res) => {
    try {
        await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id })
        res.json({ message: "Job deleted" })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router