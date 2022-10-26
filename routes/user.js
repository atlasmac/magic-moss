const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.put('/updateUser', userController.updateUser);
router.put('/updateFavorites', userController.updateFavorites);

module.exports = router;