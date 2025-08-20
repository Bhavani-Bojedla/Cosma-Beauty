const express = require("express");
const router = express.Router();

const Concern = require("../models/concerns");
const ConcernTreatment = require("../models/ConcernTreatment");
const Package = require("../models/Packages");
const Treatment = require("../models/Treatments");

const SYNONYMS = {
  darkcircle: "dark circles",
  "under eye": "dark circles",
  "under-eye": "dark circles",
  acne: "acne scars",
  "double chin": "double chin",
};

function normalizeQuery(q) {
  if (!q) return "";
  const cleaned = q.trim().toLowerCase();
  if (SYNONYMS[cleaned]) return SYNONYMS[cleaned];
  for (let k in SYNONYMS) {
    if (cleaned.includes(k)) return SYNONYMS[k];
  }
  return cleaned;
}

router.get("/", async (req, res) => {
  try {
    const raw = req.query.concern || "";
    
    if (!raw)
      return res
        .status(400)
        .json({ error: "concern query parameter required" });

    const q = normalizeQuery(raw);

    const foundConcern =
      (await Concern.findOne({ name: new RegExp(`^${q}$`, "i") })) ||
      (await Concern.findOne({ name: new RegExp(q, "i") }));

    if (!foundConcern)
      return res.json({ concern: raw, treatments: [], packages: [] });

    const mappings = await ConcernTreatment.find({
      concern_id: foundConcern._id,
    }).populate("treatment_id");
    const treatments = mappings.map((m) => ({
      _id: m.treatment_id._id,
      name: m.treatment_id.name,
    }));

    const treatmentIds = treatments.map((t) => t._id);
    const packages = await Package.find({
      treatment_id: { $in: treatmentIds },
    });

    res.json({ concern: foundConcern.name, treatments, packages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
