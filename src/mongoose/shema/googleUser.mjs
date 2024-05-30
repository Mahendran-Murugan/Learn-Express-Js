import mongoose from 'mongoose';

const googleUserSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.BigInt,
        required: true,
        unique: true,
    },
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    displayName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    }
})

export const googleUser = mongoose.model("googleUser", googleUserSchema); 