import { Schema, model } from 'mongoose';

const userStudyRoomsSchema = new Schema({
    //방 만든 사람 아이디
    id: {
        type: String,
        required: true,
    },
    //방 아이디
    roomId: {
        type: String,
        required: true,
    },
    //방 사진
    roomPhoto: {
        type: String,
        required: true,
    },
    //방 이름
    roomName: {
        type: String,
        required: true,
    },
    //방 설명글
    roomDesc: {
        type: String,
        required: true,
    },
    //공개/비공개
    open: {
        type: String,
        required: true,
    },
    //방 멤버
    members: {
        type: Array,
        required: true,
    },
    //스터디 기간: 시작
    startStudyTime: {
        type: String,
        required: true,
    },
    //스터디 기간: 끝
    endStudyTime: {
        type: String,
        required: true,
    },
    //좋아요
    likes: {
        type: Number,
        required: true,
    },
    //조회수
    views: {
        type: Number,
        required: true,
    },
    //해시태그
    hashTags: {
        type: Array,
        required: true,
    },
});

const TuserStudyRoomsModel = model('userStudyRooms', userStudyRoomsSchema);

export { TuserStudyRoomsModel };
