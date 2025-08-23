const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const cartRoute = require('./routes/cart');
const authRoutes = require('./routes/auth');

// Connect to MongoDB
mongoose.connect("mongodb+srv://akshanshdubeydev:BXwVmkucLpTVOLtX@officeroomdb.1yee85v.mongodb.net/?retryWrites=true&w=majority&appName=OfficeRoomDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route registration
app.use('/cart', cartRoute);     // for cart API
app.use('/api', authRoutes);     // for auth API (register/login)

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
