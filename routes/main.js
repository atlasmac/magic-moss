const express = require('express');
const router = express.Router();
// const passport = require('passport');
const authController = require('../controllers/auth');
// const userController = require('../controllers/user');
// const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

router.get('/logout', authController.logout);
router.get('/authenticated', authController.getAuthenticated);

module.exports = router;
