const express = require("express");
const router = express.Router();

// @route   GET api/auth
// @desc    TEST ROUTE
// @access  Private
router.get("/", (req, res) => {
  res.send("Auth ROUTE");
});

module.exports = router;
