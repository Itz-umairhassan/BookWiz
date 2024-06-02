import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from  'jsonwebtoken'
import { errorMessage, serverError, successMessage } from "../helpers/helperFuncs.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (!username || !email || !password ||
         username==="" || email===""|| password==="") {
        res.status(400).json("All Fields are required");
        return;  
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    });



    try {
        const nUser = await newUser.save();
        res.status(200).json(successMessage("User signed up",[nUser]))
    } catch (error) {
        res.status(500).json(serverError());
    }
}


export const signin=async(req,res)=>{
    console.log("user is signing in");
    const {email,password}=req.body;
    if(!email || !password || email===""|| password===""){
        return res.status(400).json(errorMessage("all fields required"))
    }
    

    const validUser=await User.findOne({email})
    if(!validUser){
        return res.status(400).json(errorMessage("Invalid Email"));
    }

    console.log('validUser', validUser)
    const validPassword=bcrypt.compareSync(password,validUser.password);
        
    if(!validPassword){
        return res.status(404).json(errorMessage("Invalid Password"));
    }
    try {
        const payload = {
            id:validUser._id
        };
      const token=jwt.sign(
        payload,
        process.env.JWT_SECRET,
      );
      
      const {password:pass,...rest}=validUser._doc;
      console.log(`token: ${token}`)

      return res.status(200).cookie('access_token', token, {
        httpOnly: true
    }).json(rest)


    } catch (error) {
        console.log(`error: ${error}`)
        res.send(500).json(serverError());
    }
}



export const updateProfile=async (req,res)=>{
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your account!");
      }
}