const mongoose = require('mongoose');
const ConcernTreatmentSchema = new mongoose.Schema({
concern_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Concern', required: true },
treatment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Treatment', required: true }
});
module.exports = mongoose.model('ConcernTreatment', ConcernTreatmentSchema);