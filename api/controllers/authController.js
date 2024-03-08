import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json("All Fields are required");
        return;  // Add this line to stop further execution
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
