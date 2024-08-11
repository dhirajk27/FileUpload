// Import necessary modules
const express = require("express");
const app = express();

// Set the port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and handle file uploads
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'  // it ensures the directory exits and is writable 
}));

// Connect to the database
const db = require("./config/database");
db.connect();  // Assuming you have a connect function in your database configuration

// Connect to Cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// API route mount
const upload = require("./routes/FileUpload");
app.use('/api/v1/upload', upload);

// Activate the server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
