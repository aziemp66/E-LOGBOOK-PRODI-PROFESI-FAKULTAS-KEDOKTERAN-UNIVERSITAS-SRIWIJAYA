//create file upload middleware with multer
const multer = require("multer");
const uuid = require("uuid").v4;

const legalizationPageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/legalizations");
    },
  }),
  fileName: (req, file, cb) => {
    cb(null, `legalization_${uuid()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".pdf") {
      return cb(new Error("Only png, jpg, jpeg and pdf files are allowed"));
    }
  },
});

const activityPhotoUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/activities");
    },
  }),
  fileName: (req, file, cb) => {
    cb(null, `activity_${uuid()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only png, jpg and jpeg files are allowed"));
    }
  },
});

const studentProfilePhotoUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/profile-pictures");
    },
  }),
  fileName: (req, file, cb) => {
    cb(null, `profile-picture_${uuid()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only png, jpg and jpeg files are allowed"));
    }
  },
});

module.exports = {
  legalizationPageUpload: legalizationPageUpload.single("legalization"),
  activityPhotoUpload: activityPhotoUpload.single("activity"),
  studentProfilePhotoUpload: studentProfilePhotoUpload.single("profilePicture"),
};
