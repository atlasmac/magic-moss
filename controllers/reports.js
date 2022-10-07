const Report = require("../models/Report");

module.exports = {
  createReport: async (req, res) => {
    try {
      await Report.create({
        siteNumber: req.body.siteNumber,
        wave: req.body.wave,
        observed: req.body.observed,
        forecast: req.body.forecast,
      });
      console.log("Report has been added");
      res.json({
        message: {
          msgBody: 'Report has been added',
          msgError: false,
        }
      })
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: 'report add failed',
          msgError: true,
          err,
        }
      })
    }
  },
  favoriteReport: async (req, res) => {
    console.log(req.body)
    try {
      const riverData = await Report.find({ siteNumber : { $in : req.body.siteNumbers }})
      res.json(riverData)
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: 'Error has occurred while trying to find report',
          msgError: true,
          err,
        }
      })
    }
  },
  getReports: async (req, res) => {
    try {
      const riverData = await Report.find({ siteNumber: req.params.siteNumber }).lean()
      res.json(riverData)
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: 'Error has occurred while trying to find report',
          msgError: true,
          err,
        }
      })
    }
  },
  updateReport: async (req, res) => {
    try {
      // if(req.header.authorization !== 'AFF8FE96-8F19-4CEE-85FD-F9FB831A8722'){
      //   throw new Error('no auth')
      // }
      await Report.findOneAndUpdate(
        { siteNumber: req.params.siteNumber },
        {
          siteNumber: req.body.siteNumber,
          wave: req.body.wave,
          observed: req.body.observed,
          forecast: req.body.forecast,
        }
      );
      res.status(200).json({
        message: {
          msgBody: 'Updated Report!',
          msgError: false,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: {
          msgBody: 'Error has occured when trying to update this report.',
          msgError: true,
          err,
        },
      });
    }
  },

};