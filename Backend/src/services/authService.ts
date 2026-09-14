import userModel from "../models/userModel";
import bcrypt from "bcrypt";

export const register = async (name:string,email:string,password:string) => {
    const user = await userModel.findOne({email});

    if(user) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,12);

    const newUser = await userModel.create({
        name,
        email,
        password:hashedPassword
    });

    return newUser;
};

export const loginService = async (email:string,password:string) => {
    const user = await userModel.findOne({email});

    if(!user) {
        throw new Error("User not found");
    }

    const isMatched = await bcrypt.compare(password,user.password);

    if(!isMatched) {
        throw new Error("Incorrect Password");
    }

    const token = await user.generateToken();

    return token;
}