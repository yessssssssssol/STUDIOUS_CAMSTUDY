import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { uploadHandler } from '../utils/multerForRoom';
import { v4 as uuid } from 'uuid';
import { userStudyRoomsService } from '../services/userStudyRoomsService';

const userStudyRoomsRouter = Router();

// 스터디 룸 생성(그룹)

// {
//     "roomName": "코딩공부방",
//     "roomDesc": "일절 잡담금지, 오로지 타자소리만 날뿐..!",
//     "roomPhoto": null,
//     "open": true,
//     "membersNum": 4,
//     "members": [],
//     "startStudyDay": "2022-06-14",
//     "endStudyDay": "2022-07-03",
//     "focusTimeStart": "10:00:00",
//     "focusTimeEnd": "18:00:00",
//     "hashTags": ["#프론트", "#백엔드", "#프로젝트"]
// }

userStudyRoomsRouter.post('/studyroom', login_required, uploadHandler.single('roomImg'), async function (req, res, next) {
    try {
        const id = req.currentUserId;
        let roomImg = req.file;
        const { roomName, roomDesc, open, membersNum, members, startStudyDay, endStudyDay, focusTimeStart, focusTimeEnd, hashTags } = req.body;
        const roomId = uuid().replace(/-/g, '');

        if (roomImg === undefined) roomImg = '사진 정보가 없습니다.';
        if (roomName && roomDesc && membersNum && members && startStudyDay && endStudyDay && focusTimeStart && focusTimeEnd === undefined) {
            return '방 정보를 제대로 입력해주세요';
        }
        console.log(roomImg);
        const newRoomInfo = {
            id,
            roomId,
            roomImg,
            roomName,
            roomDesc,
            open,
            membersNum,
            members: [],
            startStudyDay,
            endStudyDay,
            focusTimeStart,
            focusTimeEnd,
            likes: 0,
            views: 0,
            hashTags,
        };

        const roomInfo = await userStudyRoomsService.createRoom({ newRoomInfo });

        res.status(201).json(roomInfo);
    } catch (error) {
        next(error);
    }
});

userStudyRoomsRouter.post('/studyroom/img', login_required);

export { userStudyRoomsRouter };
