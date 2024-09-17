const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Creazione di un nuovo utente
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ottenere tutti gli utenti
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Modifica di un utente
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancellazione di un utente
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

