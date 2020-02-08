const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Event = require("../../models/Event");
// @route   POST api/events
// @desc    Create an Event
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("event_name", "Event Name is required")
        .not()
        .isEmpty(),
      check("proposed_dates", "proposed dates is required")
        .not()
        .isEmpty(),
      check("location", "Location is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const vendor = await User.findById(req.body.vendor).select("-password");
      const newEvent = new Event({
        event_name: req.body.event_name,
        location: req.body.location,
        vendor_name: vendor.name,
        company_name: user.name
      });

      newEvent.proposed_dates = req.body.proposed_dates.split(",").map(date => date.trim());

      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);

module.exports = router;
