require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const searchRouter = require('./routes/search');
const enquiriesRouter = require('./routes/enquiries');
const adminRouter = require('./routes/admin');
const packageRoutes = require("./routes/packages");

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  }
};
connectDB();

app.use('/search', searchRouter);
app.use('/enquiries', enquiriesRouter);
app.use('/admin', adminRouter);
app.use("/packages", packageRoutes);

app.get('/', (req, res) => res.json({ ok: true, msg: 'Cosma Beauty API' }));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
