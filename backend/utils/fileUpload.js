const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: (req, file, cb) => {
    // eslint-disable-next-line prefer-template
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileUpload = multer({ storage });

const imageFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

module.exports = {
  fileUpload,
  imageFilter,
};
