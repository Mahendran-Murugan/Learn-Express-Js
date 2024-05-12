import mangoose from "mongoose";

const userSchema = new mangoose.Schema({
    username: {
        type: mangoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    displayName: {
        type: mangoose.Schema.Types.String,
    },
    password: {
        type: mangoose.Schema.Types.String,
        required: true,
    },
})

export const User = mangoose.model('User', userSchema)