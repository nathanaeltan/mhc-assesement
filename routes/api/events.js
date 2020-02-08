const express = require("express");
const router = express.Router();

// @route   GET api/profile
// @desc    TEST ROUTE
// @access  Private
router.get("/", (req, res) => {
  res.send("PROFILE ROUTE");
});

module.exports = router;
