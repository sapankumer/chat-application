const bcrypt = require("bcrypt");
const User = require("../models/People");

function getUsers(req, res, next){

    res.render("users");

}

const userCreate = async (req, res, next) => {
    try {

        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashedPassword,
            avatar: req.files && req.files.length > 0 ? req.files[0].filename : "",
            role: req.body.role || "user",
        });
        await newUser.save();
        res.status(200).json({
            message: "User created successfully",
        });
    } catch (err) {
        console.error("userCreate error:", err);
        res.status(500).json({
           errors:{
            common:{    
                msg: err.message || "Network error"
            }
           }
        });
    }
}

module.exports = {
    getUsers,
    userCreate,
}