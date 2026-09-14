import mongoose, {Document, Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    time:Date;
    generateToken():string;
}

const userSchema = new Schema<IUser> ({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    time: {
        type:Date,
        default:Date.now()
    }
});

userSchema.methods.generateToken = function ():string {
    return jwt.sign (
        {
            userId: this._id.toString(),
            name:this.name,
            email:this.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "30d"
        }
    )
}

const User = mongoose.model("User",userSchema);

export default User;