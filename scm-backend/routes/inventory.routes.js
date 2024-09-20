const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory.model');

// Get all inventory items
router.get('/', async(req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add a new inventory item
router.post('/', async(req, res) => {
    const newItem = new Inventory({
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        supplier: req.body.supplier,
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an inventory item
router.put('/:id', async(req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an inventory item
router.delete('/:id', async(req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;