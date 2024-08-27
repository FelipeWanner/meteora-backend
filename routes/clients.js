const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all clients
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM clients';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a client by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM clients WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Create a new client
router.post('/', (req, res) => {
    const { name, email, password, street_address, city, state, postal_code, country } = req.body;
    const sql = 'INSERT INTO clients (name, email, password, street_address, city, state, postal_code, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, password, street_address, city, state, postal_code, country], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

// Update a client by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, street_address, city, state, postal_code, country } = req.body;
    const sql = 'UPDATE clients SET name = ?, email = ?, street_address = ?, city = ?, state = ?, postal_code = ?, country = ? WHERE id = ?';
    db.query(sql, [name, email, street_address, city, state, postal_code, country, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Client updated' });
    });
});

// Delete a client by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM clients WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Client deleted' });
    });
});

module.exports = router;
