const express = require("express");
const connectDB = require("./config/dbconnection");
const dotenv = require('dotenv').config();
const Contact = require("./module/schamemodule");
const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/', async (req, res) => {
    try {
        console.log("request body", req.body);
        const { name, email, number } = req.body;
        if (!name || !email || !number) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const contact = await Contact.create({
            name,
            email,
            number,
        });
        res.status(201).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        } 
        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }
        await Contact.deleteOne({ _id: req.params.id });
        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
