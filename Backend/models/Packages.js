const mongoose = require('mongoose');
const PackageSchema = new mongoose.Schema({
clinic_name: { type: String, required: true },
package_name: { type: String, required: true },
treatment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Treatment', required: true },
price: { type: Number, required: true }
});
module.exports = mongoose.model('Package', PackageSchema);