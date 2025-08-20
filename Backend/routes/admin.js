const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');


router.get('/enquiries', async (req, res) => {
try {
const enquiries = await Enquiry.find().populate({ path: 'package_id' }).sort({ created_at: -1 });
res.json(enquiries);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;