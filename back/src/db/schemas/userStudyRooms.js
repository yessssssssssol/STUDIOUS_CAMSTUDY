import { Schema, model } from 'mongoose';

const UserStudyRoomsSchema = new Schema({
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
    //방 이름
    roomName: {
        type: String,
        required: true,
    },
    //방 사진
    roomImg: {
        type: String,
        required: true,
    },
    //개인/그룹
    group: {
        type: Boolean,
        required: true,
    },
    //특정 멤버만 받을 것인지
    membersOnly: {
        type: Boolean,
    },
    //방 멤버수
    membersNum: {
        type: Number,
    },
    //스터디 기간: 시작
    startStudyDay: {
        type: String,
        required: true,
    },
    //스터디 기간: 끝
    endStudyDay: {
        type: String,
        required: true,
    },
    // 스터디 집중시간 시작
    focusTimeStart: {
        type: String,
        required: true,
    },
    // 스터디 집중시간 끝
    focusTimeEnd: {
        type: String,
        required: true,
    },
    //방 제목
    roomTitle: {
        type: String,
    },
    //방 설명글
    roomDesc: {
        type: String,
    },
    //해시태그
    hashTags: {
        type: Array,
    },
    //방 멤버
    members: {
        type: Array,
    },
    //조회수
    views: {
        type: Number,
    },
    //방 생성시간
    createdAt: {
        type: String,
        required: true,
    },
    //방 정보 업데이트 시간
    updatedAt: {
        type: String,
        required: true,
    },
    // 방 인원수 세기
    headCount: {
        type: Array,
        required: true,
    },
    // 방 만료시간
    expiredAt: {
        type: Date,
        expires: 0,
    },
});

const UserStudyRoomsModel = model('UserStudyRooms', UserStudyRoomsSchema);

export { UserStudyRoomsModel };
