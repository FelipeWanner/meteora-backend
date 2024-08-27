const express = require('express');
const router = express.Router();
const db = require('../db');  // Assuming you have a db.js to handle MySQL connection

// Search products by name or description
router.get('/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const sql = `SELECT * FROM products WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ?`;
    const searchTerm = `%${query}%`;
  
    db.query(sql, [searchTerm, searchTerm], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error searching for products' });
      }
      res.json(results);
    });
  });  

// Get top 6 products with the highest sales count
router.get('/top-sales', (req, res) => {
    const sql = 'SELECT * FROM products ORDER BY sales_count DESC LIMIT 6';
    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching top-selling products' });
        }
        console.log(results);  // This should log the query results
        res.json(results);     // Return the results as JSON
    });
});

// funcao responsavel por passar os produtos para a pagina de categorias, baseado na categoria de cada produto
router.get('/category/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName.toLowerCase();
    const query = 'SELECT * FROM products WHERE LOWER(category) = ?';
    console.log(categoryName, query);
    
    db.query(query, [categoryName], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching products' });
      }
      res.json(results);
    });
});

// Get all products
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a product by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Funcao responsavel por criar novos produtos
router.post('/', (req, res) => {
    const { name, description, price, image_urls, stock_quantity, category } = req.body;
    const sql = 'INSERT INTO products (name, description, price, image_urls, stock_quantity, category) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, description, price, JSON.stringify(image_urls), stock_quantity, category], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

// Update a product description by ID (leaving other fields untouched)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { description } = req.body; // Only updating the description for now
    
    // Ensure that we only update the description
    const sql = 'UPDATE products SET description = ? WHERE id = ?';
    
    db.query(sql, [description, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product description updated' });
    });
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product deleted' });
    });
});

module.exports = router;
