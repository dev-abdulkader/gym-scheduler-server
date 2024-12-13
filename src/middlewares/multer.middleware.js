import multer from "multer";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

// Initialize multer
export const upload = multer({ storage });