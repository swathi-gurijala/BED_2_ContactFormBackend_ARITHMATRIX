const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST: Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ success: false, error: "Email is required and must be valid" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: newContact
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET: Fetch all contact submissions
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

module.exports = router;
