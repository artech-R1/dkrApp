
const controller    = require('../controllers/authController.js');
const express = require('express');
const router = express.Router();

router.post('/login', controller.signIn);
router.post('/register', controller.signUp);
router.get('/protect', controller.protect);


module.exports = router;



