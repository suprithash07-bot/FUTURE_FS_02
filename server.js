const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();


// Lead Schema
const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        source: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["New", "Contacted", "Converted"],
            default: "New"
        },

        notes: {
            type: String,
            default: ""
        },

    followUp: {
    type: String,
    default: ""
    }
},
    {
        timestamps: true
    }
);

const Lead = mongoose.model("Lead", leadSchema);


// Home route
app.get("/", (req, res) => {
    res.send("CRM Backend is running");
});


// GET all leads
app.get("/api/leads", async (req, res) => {

    try {

        const leads = await Lead.find().sort({ createdAt: -1 });

        res.json(leads);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching leads",
            error: error.message
        });

    }
});


// POST new lead
app.post("/api/leads", async (req, res) => {

    try {

        const { name, email, source, status, notes,followUp } = req.body;

        const newLead = new Lead({
            name,
            email,
            source,
            status,
            notes,
            followUp
        });

        const savedLead = await newLead.save();

        res.status(201).json(savedLead);

    } catch (error) {

        res.status(500).json({
            message: "Error adding lead",
            error: error.message
        });

    }
});


// DELETE lead
app.delete("/api/leads/:id", async (req, res) => {

    try {

        await Lead.findByIdAndDelete(req.params.id);

        res.json({
            message: "Lead deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting lead",
            error: error.message
        });

    }
});


// UPDATE lead status
app.put("/api/leads/:id", async (req, res) => {

    try {

        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.json(updatedLead);

    } catch (error) {

        res.status(500).json({
            message: "Error updating lead",
            error: error.message
        });

    }
});


// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});