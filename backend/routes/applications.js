const express = require('express');
const router = express.Router();

const { displayApplications, createApplication, deleteApplication, updateApplication } = require('../controllers/applications');

router.route("/displayApplications").get(displayApplications);
router.route("/createApplication").post(createApplication);
router.route("/deleteApplication/:id").delete(deleteApplication);
router.route("/updateApplication/:id").put(updateApplication);

module.exports = router;