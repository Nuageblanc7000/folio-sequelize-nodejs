const fs = require("fs");
const path = require("path");

const fileService = {
  sourceFileImageProject: "/public/uploads/projects/",

  deleteFile: (files, callback) => {
    const arrayFiles = Array.isArray(files) ? files : [files];
    arrayFiles.forEach((f) => {
      const fullPath = f?.path
        ? path.join(f.path)
        : path.join(__dirname, "..", f);
      console.log(fullPath);
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
          if (err) {
            callback(err);
          }
        });
      }
    });
  },
};

module.exports = fileService;
