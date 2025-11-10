import mongoose, { Schema } from "mongoose";
import { IBlog } from "../types/blog/blog.types";
import slugify from "slugify";

const blogSchema: Schema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [
        String
    ],
    category: {
        type: String
    },
    image: {
        type: String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            likes: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            ],
            text: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ]
}, { timestamps: true });

// Slug Generate Before Save
blogSchema.pre<IBlog>("save", function (next) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
});

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
