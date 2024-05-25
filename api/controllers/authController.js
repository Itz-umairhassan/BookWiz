import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



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
        await newUser.save();
        res.status(200).json({ message: "Sign Up Successfully!!" });
    } catch (error) {
        res.status(500).json("Something went wrong!!");
    }
}




export const signin=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password || email===""|| password===""){
        return res.status(400).json("all fields are required")
    }
    

    const validUser=await User.findOne({email})
    if(!validUser){
        return res.status(400).json("User not Found");
    }
     console.log('validUser', validUser)
      const validPassword=bcrypt.compareSync(password,validUser.password);
        
    if(!validPassword){
        return res.status(404).json({message:"Invalid Password"});
    }
    try {
     
  
      const token=jwt.sign(
        {id:validUser._id},
        process.env.JWT_SECRET,
      );


      const {password:pass,...rest}=validUser._doc;

      return res.status(200).cookie('access_token', token, {
        httpOnly: true
    }).json(rest)


    } catch (error) {
        console.log(`error: ${error}`)
    }
}