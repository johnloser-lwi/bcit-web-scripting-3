// Multer storage configuration for handling cover image file uploads
// Multer is middleware that processes multipart/form-data (files)

const multer = require('multer');

// diskStorage lets us control where files are saved and what they are named
const storage = multer.diskStorage({
  // destination tells multer which folder to save uploaded files into
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },

  // filename builds a unique name using the current timestamp + original filename
  // Date.now() prevents collisions when two users upload files with the same name
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

// Create the multer upload middleware using our custom storage config
const upload = multer({ storage: storage });

module.exports = upload;
