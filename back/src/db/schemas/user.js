import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: '설명이 아직 없습니다. 추가해 주세요.',
    },
    profileUrl: {
        type: String,
        required: false,
        default:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    createdAt: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: String,
        required: true,
    },
});

const UserModel = model('User', UserSchema);

export { UserModel };
