const multer = require('multer');
const { uploadsFolder } = require('../config');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsFolder);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const isJpeg = file.mimetype === 'image/jpeg';
  cb(null, isJpeg);
};

module.exports = multer({
  storage,
  fileFilter,
});
