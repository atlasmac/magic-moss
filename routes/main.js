const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

router.get('/logout', authController.logout);
router.get('/authenticated', authController.getAuthenticated);

router.put('/updateUser', authController.updateUser);
router.put('/updateFavorites', authController.updateFavorites);


module.exports = router;
