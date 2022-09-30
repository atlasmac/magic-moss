const express = require('express');
const router = express.Router();
const commentsController = require("../controllers/comments")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/:siteNumber', commentsController.getComments);

router.post("/createComment/:siteNumber", commentsController.createComment);

router.delete('/deleteComment', commentsController.deleteComment)

module.exports = router;