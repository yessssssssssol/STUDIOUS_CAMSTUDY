import { Schema, model } from 'mongoose';
import dayjs from 'dayjs';

dayjs.locale('ko');
const date = dayjs();
// console.log(date.format("YYYY-MM-DD HH:mm:ss"))
// console.log(dayjs(new Date()).getTime())
// console.log(date.getTime())
const UserSchema = new Schema(
    {
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
        // 하루 공부할 목표 시간 / 분단위로 들어오게
        // timeGoalADay: {
        //   type: Number,
        //   default: 0,
        //   required: false,
        // },
        createdAt: {
            type: String,
            required: true,
            default: date.format('YYYY-MM-DD HH:mm:ss'),
        },
        updatedAt: {
            type: String,
            required: true,
            default: date.format('YYYY-MM-DD HH:mm:ss'),
        },
    },
    // {
    //   timestamps: true,
    // }
);

const UserModel = model('User', UserSchema);

export { UserModel };
