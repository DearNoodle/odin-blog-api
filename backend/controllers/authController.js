const jwt = require('jsonwebtoken');
const query = require('../models/query');
const { validationResult } = require('express-validator');

const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';

async function registerUser(req, res) {
  const validateErr = validationResult(req);
  if (!validateErr.isEmpty()) {
    return res.status(400).send({
      errors: validateErr.array(),
    });
  }
  try {
    await query.addUser(req);
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to Register User');
  }
}

async function jwtLogin(req, res) {
  const token = jwt.sign({ userId: req.user.id }, jwtSecret, { expiresIn: '5m' });
  res.json({ token });
}

module.exports = {
  registerUser,
  jwtLogin,
};
