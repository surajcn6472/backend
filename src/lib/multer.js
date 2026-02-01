const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//     "video/mp4"
    
//   ];

//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("File not supported").message, false);
//   }
// };

exports.multerUpload = multer({
  storage,
  // fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});