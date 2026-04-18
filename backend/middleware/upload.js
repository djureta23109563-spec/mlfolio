// backend/middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads/ folder if it does not exist yet
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory at:', uploadsDir);
}

// Where and how to save uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Saving file to:', uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename: timestamp + random number + original extension
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = unique + path.extname(file.originalname);
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

// Only allow image file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  
  console.log('File upload check:', {
    originalName: file.originalname,
    mimetype: file.mimetype,
    ext: path.extname(file.originalname),
    extValid: ext,
    mimeValid: mime
  });
  
  if (ext && mime) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed (jpg, png, gif, webp)'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // max 5 MB per file
});

module.exports = upload;