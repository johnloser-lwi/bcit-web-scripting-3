const multer = require('multer');

// create the storage instance
const storage = multer.diskStorage({
  // where the file is stored
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  // define the formatting of file name {date}-{file_name}
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

// create the multer instance using storage instance as storage
const upload = multer({ storage: storage });

module.exports = upload;
