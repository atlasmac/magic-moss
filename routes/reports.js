const express = require('express');
const router = express.Router();
const reportsController = require("../controllers/reports")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/:siteNumber', reportsController.getReports);
router.post("/createReport", reportsController.createReport);
router.put("/updateReport/:siteNumber", reportsController.updateReport);


module.exports = router;