const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./database');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.use((req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send("No token provided");

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token");
    req.userId = decoded.id;
    next();
  });
});

router.post('/todos', (req, res) => {
  const { description, status } = req.body;
  db.run(`INSERT INTO todos (user_id, description, status) VALUES (?, ?, ?)`, [req.userId, description, status], function(err) {
    if (err) {
      return res.status(500).send("Error creating to-do");
    }
    res.status(200).send({ id: this.lastID });
  });
});

router.get('/todos', (req, res) => {
  db.all(`SELECT * FROM todos WHERE user_id = ?`, [req.userId], (err, rows) => {
    if (err) {
      return res.status(500).send("Error retrieving to-dos");
    }
    res.status(200).send(rows);
  });
});

router.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  db.run(`UPDATE todos SET description = ?, status = ? WHERE id = ? AND user_id = ?`, [description, status, id, req.userId], function(err) {
    if (err) {
      return res.status(500).send("Error updating to-do");
    }
    res.status(200).send("To-do updated successfully");
  });
});

router.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM todos WHERE id = ? AND user_id = ?`, [id, req.userId], function(err) {
    if (err) {
      return res.status(500).send("Error deleting to-do");
    }
    res.status(200).send("To-do deleted successfully");
  });
});

module.exports = router;
