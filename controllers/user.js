const passport = require('passport');
const User = require('../models/User');
const cloudinary = require('../middleware/cloudinary');

module.exports = {
  updateFavorites: async (req, res) => {
    console.log('req: ',req.session.passport.user)
    try {
      await User.findOneAndUpdate(
        { _id: req.session.passport.user },
        {
          favorites: req.body.favorites,
        },
        console.log(req.body)
      );
      res.status(200).json({
        message: {
          msgBody: 'Updated favorites!',
          msgError: false,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: 'Error has occured when trying to update favorites',
          msgError: true,
          err,
        }
      });
    }
  },
  updateUser: async (req, res) => {
		console.log(req.body);
		if (req.body.profileImg !== req.body.oldImg) {
			cloudinary.uploader
				.destroy(req.body.oldImg)
				.then(result => console.log('deleted profile pic', result));
		}
		try {
			await User.findOneAndUpdate(
				{ _id: req.body.id },
				{
					// userName: req.body.userName,
					// email: req.body.email,
					profileImg: req.body.profileImg
				}
			);
			res.status(200).json({
				message: {
					msgBody: 'Updated user information!',
					msgError: false,
				},
			});
		} catch (err) {
			console.log(err);
      res.status(500).json({
				message: {
					msgBody: 'Error has occured when trying to update this user.',
					msgError: true,
					err,
				},
			});
		}
	},
}