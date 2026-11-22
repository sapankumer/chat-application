const multer = require("multer");
const path = require("path");

function uploader(subfolder_path, acceptedFiles, maxSize, errorMessage) {
    // folder absolute path
    const UPLOADS_FOLDER = path.join(__dirname, `../public/uploads/${subfolder_path}/`);

    // create a new multer instance with the given configuration
    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, UPLOADS_FOLDER);
            },
            filename: (req, file, cb) => {
                const fileExt = path.extname(file.originalname);
                const fileName = file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") + "-" + Date.now();

                cb(null, fileName + fileExt);
            },
        }),
        limits: {
            fileSize: maxSize,
        },
        fileFilter: (req, file, cb) => {
            if (acceptedFiles.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error(errorMessage));
            }
        },
    });

    return upload;
}

module.exports = uploader;
