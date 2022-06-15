import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { uploadRoomImgHandler } from '../utils/multerForRoom';
import { v4 as uuid } from 'uuid';
import { userStudyRoomsService } from '../services/userStudyRoomsService';

const userStudyRoomsRouter = Router();

// 스터디 룸 생성(그룹)
// {
//     "roomName": "코딩공부방",
//     "roomImg": null,
//     "group": true,
//     "membersOnly": true,
//     "membersNum": 4,
//     "startStudyDay": "2022-06-14",
//     "endStudyDay": "2022-07-03",
//     "focusTimeStart": "10:00:00",
//     "focusTimeEnd": "18:00:00",
//     "roomTitle": "next.js 스터디할 분 모십니다!",
//     "roomDesc": "일절 잡담금지, 오로지 타자소리만 날뿐..!",
//     "hashTags": ["#프론트", "#백엔드", "#프로젝트"],
// }

userStudyRoomsRouter.post('/studyroom', login_required, uploadRoomImgHandler.single('roomImg'), async function (req, res, next) {
    try {
        const id = req.currentUserId;
        const roomId = uuid().replace(/-/g, '');
        let roomImg = req.file;
        let newRoomInfo = {};

        const { roomName, group, membersOnly, membersNum, startStudyDay, endStudyDay, focusTimeStart, focusTimeEnd, roomTitle, roomDesc, hashTags } = req.body;

        if (roomImg === undefined) roomImg = '사진 정보가 없습니다.';

        if (group === false) {
            // 개인 룸
            if (roomName && startStudyDay && endStudyDay && focusTimeStart && focusTimeEnd === undefined) {
                return '방 정보를 제대로 입력해주세요';
            }
            newRoomInfo = {
                id,
                roomId,
                roomImg,
                roomName,
                group,
                startStudyDay,
                endStudyDay,
                focusTimeStart,
                focusTimeEnd,
            };
            console.log('개인룸 생성');
        } else if (group === true && membersOnly === false) {
            // 공개 룸
            if (roomName && membersNum && startStudyDay && endStudyDay && focusTimeStart && focusTimeEnd === undefined) {
                return '방 정보를 제대로 입력해주세요';
            }
            newRoomInfo = {
                id,
                roomId,
                roomImg,
                roomName,
                group,
                membersOnly, // 개인룸과 다른 점
                membersNum, // 개인룸과 다른 점
                startStudyDay,
                endStudyDay,
                focusTimeStart,
                focusTimeEnd,
                views: 0, // 개인룸과 다른 점
            };
            console.log('오픈룸 생성');
        } else if (group === true && membersOnly === true) {
            if (roomName && startStudyDay && endStudyDay && focusTimeStart && focusTimeEnd && roomTitle && roomDesc && hashTags === undefined) {
                return '방 정보를 제대로 입력해주세요';
            }
            // 멤버 온니 룸
            newRoomInfo = {
                id,
                roomId,
                roomImg,
                roomName,
                group,
                membersOnly,
                membersNum,
                startStudyDay,
                endStudyDay,
                focusTimeStart,
                focusTimeEnd,
                roomTitle,
                roomDesc,
                hashTags,
                members: [],
                views: 0,
            };
            console.log('멤버룸 생성');
        } else {
            return '방 정보를 제대로 입력해주세요';
        }

        const roomInfo = await userStudyRoomsService.createRoom({ newRoomInfo });

        res.status(201).json(roomInfo);
    } catch (error) {
        next(error);
    }
});

export { userStudyRoomsRouter };
