import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        userName: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
    }
);

export const UserModel = mongoose.model('User', schema);