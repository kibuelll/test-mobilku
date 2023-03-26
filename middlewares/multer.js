const multer = require("multer");

const fileUpload = multer({
  storage : multer.memoryStorage(),
  limits : {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10 MB
  }
});

module.exports = fileUpload;
