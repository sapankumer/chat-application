//external imports
const { check, validationResult } = require("express-validator");
const People = require('../../models/People');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');


//internal imports

const addUserValidators = [
    check('name')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters long')
        .isAlpha('en-US',{ignore:'- -'})
        .withMessage('Name must contain only alphabetic characters')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value) => {
            try{
            const user = await People.findOne({email: value});
            if(user){
                throw createError('Email already exists');
            }
            }catch(error){
                throw createError(error.message);
            }
        }),

    check('mobile')
        .isMobilePhone('bn-BD')
        .withMessage('Invalid mobile number')
        .trim()
        .custom(async (value) => {
            try{
            const user = await People.findOne({mobile: value});
            if(user){
                throw createError('Mobile number already exists');
            }
            }catch(error){
                throw createError(error.message);
            }
        }),
    check('password')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
];

const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        //remove uploaded file
        if(req.files && req.files.length > 0){
            const fileName = req.files[0].filename;
            const filePath = path.join(__dirname, `../../public/uploads/avatars/${fileName}`);
            fs.promises.unlink(filePath).catch((err) => console.log(err));
        }
        //send error response
        res.status(422).json({
            errors: mappedErrors,
        });
        
    }
};

module.exports = {
    addUserValidators, 
    userValidationHandler
};