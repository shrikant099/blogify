import mongoose, { Document } from "mongoose";


export interface IBlog extends Document {
    title: string;
    content: string;
    slug: string;
    author: mongoose.Types.ObjectId;
    tags?: string[];
    category?: string;
    image?: string;
    likes: mongoose.Types.ObjectId[];
    comments: {
        user: mongoose.Types.ObjectId;
        text: string;
        createdAt?: Date
    }[];
    createdAt: Date;
    updatedAt: Date;
}