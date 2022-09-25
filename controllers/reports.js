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