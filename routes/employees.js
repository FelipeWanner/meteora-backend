const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all employees
router.get('/', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching employees');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
