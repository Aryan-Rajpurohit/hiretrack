const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const jobRoutes = require("./routes/jobs")

const app = express()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json())  // read json from request

// Routes
app.use("/api/auth",authRoutes)
app.use("/api/jobs",jobRoutes)

// test route
app.get("/",(req,res) => {
    res.send("Hiretrack is running")
});

// connect to mongodn and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected")
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => console.log("MongoDB Error",err))