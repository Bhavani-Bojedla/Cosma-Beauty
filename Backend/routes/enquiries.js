const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Enquiry = require("../models/Enquiry");
const Package = require("../models/Packages");

router.post(
  "/",
  [
    body("package_id").notEmpty().withMessage("package_id required"), 
    body("user_name").trim().notEmpty().withMessage("user_name required"),
    body("user_email").isEmail().withMessage("valid email required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { package_id, user_name, user_email, message } = req.body;

    try {
      const pkg = await Package.findById(package_id);
      if (!pkg) return res.status(400).json({ error: "Package not found" });

      const enq = await Enquiry.create({
        package_id,
        user_name,
        user_email,
        message,
      });

      return res.json({ success: true, enquiry: enq });
    } catch (err) {
      console.error("Server error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
