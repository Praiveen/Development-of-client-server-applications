const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Unable to login');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: 'Invalid credentials' });
    }
});

module.exports = router; 