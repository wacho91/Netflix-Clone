import { User } from "../models/userModels.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js"
;

export async function signup(req, res) {
    try {
        const { email, password, username} = req.body;

        if(!email ||!password || !username) {
            return res.status(400).json({ success: false, messagge: "All fields are required"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+s/;

        if(emailRegex.test(email)) {
            return res.status(400).json({success: false, messagge: "Invalid email"})
        }

        if(password.length < 6) {
            return res.status(400).json({success: false, messagge: "Password must be at least 6 characters long"})
        }

        const existingUserByEmail = await User.findOne({email:email})

        if(existingUserByEmail) {
            return res.status(400).json({success: false, messagge: "Email already exists"})
        }

        const existingUserByUsername = await User.findOne({username:username})

        if(existingUserByUsername) {
            return res.status(400).json({success: false, messagge: "Username already exists"})
        }

        const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

		const newUser = new User({
			email,
			password:hashedPassword,
			username,
			image,
		});

        
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: "",
            },
        });
               
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({success: false, messagge: "Internal server error"})
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({success: false, messagge: "Email and password are required"})
        }

        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({success: false, message: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({success: false, message: "Invalid credentials"})
        }

        generateToken(user._id, res);
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: "",
            },
        });
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
		res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}