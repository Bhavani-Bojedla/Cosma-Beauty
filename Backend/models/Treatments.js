const mongoose = require('mongoose');
const TreatmentSchema = new mongoose.Schema({
name: { type: String, required: true }
});
module.exports = mongoose.model('Treatment', TreatmentSchema)