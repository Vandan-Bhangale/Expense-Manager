import { Request, Response } from "express";
import { register,loginService } from "../services/authService";

export const postSignup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const user = await register(name, email, password);

        res.status(201).json({
            success:true,
            message:"User registered sucessfully.",
            user
        });
    } catch (err) {
        console.log("Error while registering user: ",err);
        return res.status(500).json({
            success: false,
            message:"Intenal server error"
        })
    }
};

export const postLogin = async (req:Request,res:Response) => {
    try {
        const {email,password} = req.body;

        const token = await loginService(email,password);

        res.cookie("jwt",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict"
        });

        res.status(200).json({
            success:true,
            message:"Login Successfull"
        });
    } catch (err) {
        return res.status(500).json({message:"Internal server error"});
    }
}