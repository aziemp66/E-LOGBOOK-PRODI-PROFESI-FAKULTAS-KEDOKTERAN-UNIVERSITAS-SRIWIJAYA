//create file upload middleware with multer
const multer = require("multer");
const uuid = require("uuid").v4;

const legalizationPageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/legalization-pages");
    },
  }),
  fileName: (req, file, cb) => {
    cb(null, `legalPage_${uuid()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === ".pdf") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const activityPhotoUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/activity-photos");
    },
  }),
  fileName: (req, file, cb) => {
    cb(null, `activityPhoto_${uuid()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === ".jpeg" ||
      file.mimetype === ".png" ||
      file.mimetype === ".jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const studentProfilePhotoUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/student-profile-photos");
    },
  }),
  fileName: (req, file, cb) => {
    cb(null, `studentProfilePhoto_${uuid()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === ".jpeg" ||
      file.mimetype === ".png" ||
      file.mimetype === ".jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = {
  legalizationPageUpload,
  activityPhotoUpload,
  studentProfilePhotoUpload,
};
