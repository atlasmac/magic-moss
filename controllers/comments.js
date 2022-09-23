const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id
      });
      console.log("comment has been added");
      res.json({
        message: {
          msgBody: 'Comment has been added',
          msgError: false,
        }
      })
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: 'comment failed',
          msgError: true,
          err,
        }
      })
    }
  },
  getComments: async (req, res) => {
    try {
      const comments = await Comment.find().sort({ createdAt: "asc" }).populate('user').lean()
      res.json(comments)
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: 'Error has occurred while trying to find comments',
          msgError: true,
          err,
        }
      })
    }
  }

};