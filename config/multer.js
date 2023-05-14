const multer = require("multer");
const { MAX_FILE_SIZE } = process.env;
const path = require("path");

const { ErrorMulter } = require("../utils/Responses/Error.response");
const ErrorCode = require("../utils/Responses/code.error");
/**
 * @param {Request} req
 * @param {Express.Multer.File} file
 * @param {import("multer").FileFilterCallback} cb
 */
const fileFilterProject = (req, file, cb) => {
  const authorizeMimeTypes = ["image/jpeg", "image/png"];
  if (authorizeMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        name: ErrorCode.MULTER_ERROR,
        code: ErrorCode.MIMETYPE_UNEXPECTED,
        path: "images",
      },
      false
    );
  }
};
/*****storage config********* */
const storageImages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/projects"));
  },
  filename: (req, file, cb) => {
    const posExtension = file.mimetype.search("/");
    cb(
      null,
      Date.now() +
        Math.round(Math.random() * 1000) +
        "." +
        file.mimetype.slice(posExtension + 1)
    );
  },
});

/*****storage config********* */
const storageIcon = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/upload/icon");
  },
  filename: (req, file, cb) => {
    const originalName = path.normalize(file.originalname);
    const newName =
      Date.now() + "-" + originalName.replace(/[\u0300-\u036f]/g, "");
    cb(null, newName);
  },
});

//config multer
const multerProjectConfig = multer({
  storage: storageImages,
  fileFilter: fileFilterProject,
  limits: {
    fileSize: 10485760,
  },
});

module.exports = { multerProjectConfig };
