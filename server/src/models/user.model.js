import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user'],
            default: 'user'
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            trim: true
        },
        avatar: {
            type: String,
        }
    }, 
    { timestamps: true });

export const User = mongoose.model("User", userSchema);
