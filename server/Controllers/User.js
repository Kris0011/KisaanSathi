const { sendEmail } = require("../middlewares/sendMail");
const Token = require("../models/Token");
const User = require("../models/User");
const jwt = require("jsonwebtoken")

const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});



exports.register = async (req, res) => {
    try {
        const { name, email, password, contact, address } = req.body;

        console.log(req.body);

        const tempFilePath = req.file.path;


        await cloudinary.uploader.upload(tempFilePath, (err, result) => {
            if (err) {
                console.log(err);
            }
            url = result.url;
            public_id = result.public_id;
        });

        let user = await User.findOne({ email });

        if (user && user.isVerified) {
            return res.status(401).json({
                success: false,
                message: 'User already exists',
            });
        }

        if (!user) {
            user = await User.create({
                name,
                email,
                password,
                contact,
                address,
                avtar: { url, public_id },
            });
            const otp = await user.generateOTP();
            
            user.verifyOTP = `${otp}`
            user.verifyOTPexpires = new Date(Date.now() + 10 * 60 * 1000)
    
            await user.save()
            await sendEmail({
                email,
                subject: 'OTP from Kisaan Sathi',
                message:  `your OTP is ${otp}`,
            });
    
            res.status(200).json({
                success: true,
                otp,
                message: 'OTP sent Successfully to your email',
            });
        }
        else{
            const otp = await user.generateOTP();
            console.log(`Your OTP is ${otp}`);
            

            user.verifyOTP = `${otp}`
            user.verifyOTPexpires = new Date(Date.now() + 1 * 60 * 1000)

            await user.save()
            await sendEmail({
                email:user.email,
                subject: 'OTP from Kisaan Sathi',
                message:  `your OTP is ${otp}`,
            });

            res.status(200).json({
                success: true,
                otp,
                message: 'OTP sent Successfully to your email',
            });
        }

    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message,
        });
    }
};


exports.verifyOTP = async (req, res) => {
    try{
        const {otp,email} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        console.log(user.verifyOTPexpires.getTime() + " "+ Date.now())

        if(user.verifyOTPexpires.getTime() < Date.now())
        {
            return res.status(404).json({
                success:false,
                message:'INVALID or EXPIRED opt'
            })
        }

        if(user.verifyOTP != otp)
        {
            return res.status(404).json({
                success:false,
                message:'INVALID otp'
            })
        }

        user.isVerified = true;
        user.save()

        const token = await user.generateToken();
        
        res.cookie("token",token,{expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), httpOnly: true }).status(200).json({
            success:true,
            user,
            message:"user Verified"
        })  


    }catch(err)
    {
        
        res.status(500).json({
            success: false,
            error:err.message,
        })
    }
}

exports.login = async (req,res) => {
    try{

        const {email,password} = req.body

        if(!email || !password)
        {
            return res.status(400).json({
                success: false,
                message:"Enter Credentials"
            })
        }

        const user = await User.findOne({email: email}).select("+password")

        if (!user || !user.isVerified) {
            return res.status(404).json({
                success: false,
                message:"User not found"
            })
        }

        const isMatch = await user.matchPassword(password)

        if(!isMatch) {
            return res.status(404).json({
                success: false,
                message:"Invalid Credentials",
            })
        }

        const token = await user.generateToken()

        res.cookie("token",token,{expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), httpOnly: true }).status(200).json({
            success:true,
            user
        })


    }catch(err)
    {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.logout = async (req,res) => {
    try{
        res.status(200).cookie("token",null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message:"Logout Successfully"
        })

    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.loadUser = async (req,res) => {
    try{
        const {token} = req.cookies

        if(!token)
        {
            return res.status(404).json({
                success:false,
                message:'Login First'
            })
        }

        const decoded_id = await jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findOne({_id: decoded_id._id})

        res.status(200).json({
            success:true,
            user
        })

    }catch(err)
    {
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
}


exports.subscribeUser = async (req, res) => {

    console.log("subscribing user...");
    // const { targetUserId } = req.params; // Assuming targetUserId is passed in the URL parameters
    // const subscriberUserId = req.user._id; // Assuming the subscriber user is authenticated

    const { targetUserId, subscriberUserId } = req.body;
    // targetUserId : jene subscribe karavu che (creater of auction)
    // subscriberUserId : je subscribe kare che (logged in as user)
  
    
    try {
        // Check if the subscriberUserId is in the target user's subscribedBy array
        const targetUser = await User.findById(targetUserId);
    
        if (targetUser.subscribedBy.includes(subscriberUserId)) {
          // If already subscribed, unsubscribe by removing the subscriberUserId
          await User.findByIdAndUpdate(targetUserId, {
            $pull: { subscribedBy: subscriberUserId },
          });
    
          res.status(200).json({ message: 'Unsubscribed successfully' });
        } else {
          // If not subscribed, subscribe by adding the subscriberUserId
          await User.findByIdAndUpdate(targetUserId, {
            $addToSet: { subscribedBy: subscriberUserId },
          });
    
          res.status(200).json({ message: 'Subscribed successfully' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
  };