// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Concern = require("./models/concerns");
const Treatment = require('./models/Treatments');
const ConcernTreatment = require('./models/ConcernTreatment');
const Package = require('./models/Packages');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' Connected to MongoDB for seeding');

    await Concern.deleteMany();
    await Treatment.deleteMany();
    await ConcernTreatment.deleteMany();
    await Package.deleteMany();

    const concerns = await Concern.insertMany([
      { name: 'acne scars' },
      { name: 'dark circles' },
      { name: 'double chin' }
    ]);

    const treatments = await Treatment.insertMany([
      { name: 'Microneedling' },
      { name: 'Chemical Peel' },
      { name: 'Laser Resurfacing' },
      { name: 'Under-eye Filler' },
      { name: 'PRP Under-eye' },
      { name: 'HIFU' },
      { name: 'Kybella' }
    ]);

    const findConcern = name => concerns.find(c => c.name === name);
    const findTreatment = name => treatments.find(t => t.name === name);

    const mappings = [
      ['acne scars', ['Microneedling', 'Chemical Peel', 'Laser Resurfacing']],
      ['dark circles', ['Under-eye Filler', 'PRP Under-eye']],
      ['double chin', ['HIFU', 'Kybella']]
    ];

    for (let [cName, tNames] of mappings) {
      const c = findConcern(cName);
      for (let tName of tNames) {
        const t = findTreatment(tName);
        await ConcernTreatment.create({ concern_id: c._id, treatment_id: t._id });
      }
    }

    const packages = [
      { clinic_name: 'Glow Clinic', package_name: 'Microneedling Starter', treatment: 'Microneedling', price: 8000 },
      { clinic_name: 'Radiance Clinic', package_name: 'Chemical Peel Gold', treatment: 'Chemical Peel', price: 6000 },
      { clinic_name: 'Luxe Aesthetics', package_name: 'Laser Resurfacing Pro', treatment: 'Laser Resurfacing', price: 20000 },
      { clinic_name: 'Glow Clinic', package_name: 'Under-eye Filler Basic', treatment: 'Under-eye Filler', price: 12000 },
      { clinic_name: 'DermaCare', package_name: 'PRP Under-eye Advanced', treatment: 'PRP Under-eye', price: 15000 },
      { clinic_name: 'Contour Studio', package_name: 'HIFU Chin Lift', treatment: 'HIFU', price: 18000 },
      { clinic_name: 'ShapeWell', package_name: 'Kybella Double Chin Reduction', treatment: 'Kybella', price: 22000 }
    ];

    for (let p of packages) {
      const t = findTreatment(p.treatment);
      await Package.create({
        clinic_name: p.clinic_name,
        package_name: p.package_name,
        treatment_id: t._id,
        price: p.price
      });
    }

    console.log('Seed complete');
    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
