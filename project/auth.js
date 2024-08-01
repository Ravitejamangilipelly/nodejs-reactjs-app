const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
    if (err) {
      return res.status(500).send("Error registering user");
    }
    res.status(200).send("User registered successfully");
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) {
      return res.status(404).send("User not found");
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  });
});

module.exports = router;
