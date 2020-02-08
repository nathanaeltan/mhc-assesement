const express = require("express");
const router = express.Router();

// @route   GET api/users
// @desc    TEST ROUTE
// @access  Private
router.get("/", (req, res) => {
  res.send("USER ROUTE");
});

module.exports = router;
