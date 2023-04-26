const express = require('express');
const { signIn, register } = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', (req, res) => register(req, res));
router.post('/login', (req, res) => signIn(req, res));


module.exports = router;