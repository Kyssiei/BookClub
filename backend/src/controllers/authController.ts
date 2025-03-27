import { Request, Response, NextFunction } from "express";
import User from "../models/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// register user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {name, email, password} = req.body;

        //check to see if user exists
        const userExists = await User.findOne({email})
        if (userExists){
            res.status(400).json({message: "You already have an account"});
            return;
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user 
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: "User registered succesfully"});

    } catch (error) {
       next(error);
    }
   
};


// Login User 
export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user){
            res.status(400).json({message: "Invalid email"});
            return;
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({message: "Invalid password"});
            return;
        }

        //generate jwt token 
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {
            expiresIn: "7d",
        });

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin ?? false,
            }
        });

    } catch (error) {
        next(error);
        // res.status(500).json({message: "Server error", error});
    }
};

//Logout User
export const logoutUser = async (req: Request, res: Response) => {
    res.json({message: "User logged out successfully"})
}