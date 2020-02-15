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
        company_name: user.name,
        user: user.id,
        vendor: vendor.id
      });

      newEvent.proposed_dates = req.body.proposed_dates
        .split(",")
        .map(date => date.trim());

      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// @route   GET api/events
// @desc    See all Events from HR side
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

// @route   GET api/events/vendor
// @desc    See all Events from Vendor Side
// @access  Private
router.get("/vendor", auth, async (req, res) => {
  try {
    const events = await Event.find({ vendor: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

// @route   GET api/events/:id
// @desc    Get event by ID
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(500).send("SERVER ERROR");
  }
});

// @route   DELETE api/events/:id
// @desc    Delete Event
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    // Check if user owns event

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await event.remove();

    res.json({ msg: "Event Deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(500).send("SERVER ERROR");
  }
});

// @route   POST api/events/remarks/:id
// @desc    Leave remark on Event
// @access  Private
router.post(
  "/remarks/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user.id).select("-password");
      const event = await Event.findById(req.params.id);
      if (event.vendor.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      const newRemark = {
        text: req.body.text,
        name: user.name
      };
      event.remarks.unshift(newRemark);

      await event.save();
      res.json(event.remarks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// @route   PUT api/events/status/:id
// @desc    Approve a status
// @access  Private

router.put("/status/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.vendor.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    event.status = !event.status;
    await event.save();
    const events = await Event.find({ vendor: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error" });
  }
});

// Confirm a date
router.put("/date/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.vendor.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    event.confirmed_date = req.body.confirmed_date;
    await event.save();
    const events = await Event.find({ vendor: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error" });
  }
});

module.exports = router;
