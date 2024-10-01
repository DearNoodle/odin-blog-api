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
    await query.createUser(req);
    res.send('Register Success');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to Register User');
  }
}

async function generateJWT(req, res) {
  const token = jwt.sign({ userId: req.user.id }, jwtSecret, { expiresIn: '30m' });
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 60 * 1000,
  });

  res.json({ message: 'Login successful' });
}

async function getUserId(req, res) {
  res.json({ userId: req.user.id });
}

module.exports = {
  registerUser,
  generateJWT,
  getUserId,
};
