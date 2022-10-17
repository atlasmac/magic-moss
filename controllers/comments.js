const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        siteNumber: req.params.siteNumber,
        likes: 0,
        user: req.session.passport.user
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
      const comments = await Comment.find({ siteNumber: req.params.siteNumber }).sort({ createdAt: "desc" }).populate('user').lean()
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
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.body.id });
      res.status(200).json({
        message: {
          msgBody: 'Deleted Student!',
          msgError: false,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: 'Error has occured when trying to delete this student.',
          msgError: true,
          err,
        },
      });
    }
  },


};