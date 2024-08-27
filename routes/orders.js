const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all orders
router.get('/', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching orders');
    } else {
      res.json(results);
    }
  });
});

// Add a new order
router.post('/', (req, res) => {
  const { client_id, total_price, products, shipping_address, payment_method } = req.body;
  const query = 'INSERT INTO orders (client_id, total_price, products, shipping_address, payment_method) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [client_id, total_price, JSON.stringify(products), shipping_address, payment_method], (err, result) => {
    if (err) {
      res.status(500).send('Error placing order');
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

module.exports = router;
