const uploder = require("../../utilities/singleUploder");

function avatarUpload(req,res,next){
    const upload = uploder(
            'avatars',
            ["image/jpeg","image/png","image/jpg","image/webp"],
            1024*1024*5,
            'only .jpeg, .jpg, .png, .webp formats are allowed'
    );
    upload.any()(req,res,(err)=>{
        if (err) {
            res.status(422).json({
                errors: {
                    avatar:{
                        msg:err.message
                    }
                }
            })         
        }else{
            next()
        }
    });
}

module.exports = avatarUpload;