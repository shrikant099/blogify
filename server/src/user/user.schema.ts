import { model, Schema } from "mongoose";
import { Document } from "mongoose";

export enum ROLE {
    USER = "user",
    ADMIN = "admin"
}
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: ROLE;
    resetOtp?: number | null;
    resetOtpExpiry?: Date | null;
    isOtpVerified?: boolean;
    googleId: string;
    avatar: string;

}

const userSchema = new Schema<IUser>({
    googleId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, "Please fill a valid email address"],
        index: true
    },
    role: {
        type: String,
        enum: ROLE,
        default: ROLE.USER
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    resetOtp: {
        type: Number,
        required: false
    },
    resetOtpExpiry: {
        type: Date,
        required: false
    },
    isOtpVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    avatar: {
        type: String,
        default:"../guest.png"
    }

});

export const User = model<IUser>("User", userSchema)