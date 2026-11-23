// external imports
const express = require("express");

// internal imports
const { getUsers,userCreate } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {addUserValidators, userValidationHandler} = require("../middlewares/users/userValidators");

const router = express.Router();

//users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

router.post("/", avatarUpload, addUserValidators, userValidationHandler, userCreate); 

// module exports
module.exports = router;