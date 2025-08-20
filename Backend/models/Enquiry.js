const mongoose = require('mongoose');
const EnquirySchema = new mongoose.Schema({
package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
user_name: { type: String, required: true },
user_email: { type: String, required: true },
message: { type: String },
created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Enquiry', EnquirySchema);