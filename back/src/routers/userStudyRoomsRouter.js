import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { uploadRoomImgHandler } from '../utils/multerForRoom';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { userStudyRoomsService } from '../services/userStudyRoomsService';

const userStudyRoomsRouter = Router();

userStudyRoomsRouter.post('/studyroom', login_required, uploadRoomImgHandler.single('roomImg'), async function (req, res, next) {
    try {
        const id = req.currentUserId;
        const roomId = uuid().replace(/-/g, '');
        let roomImg = req.file;
        let newRoomInfo = {};
        const now = dayjs();

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
                createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: now.format('YYYY-MM-DD HH:mm:ss'),
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
                createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: now.format('YYYY-MM-DD HH:mm:ss'),
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
                createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: now.format('YYYY-MM-DD HH:mm:ss'),
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

userStudyRoomsRouter.put('/studyroom', login_required, uploadRoomImgHandler.single('roomImg'), async function (req, res, next) {
    try {
        let updateChange = {};
        let roomImg = req.file;
        const now = dayjs();
        const { roomId, roomName, group, membersOnly, membersNum, startStudyDay, endStudyDay, focusTimeStart, focusTimeEnd, roomTitle, roomDesc, hashTags } = req.body;

        updateChange.updateAt = now.format('YYYY-MM-DD HH:mm:ss');
        if (roomName) updateChange.roomName = roomName;
        if (roomImg) updateChange.roomImg = roomImg;
        if (membersNum) updateChange.membersNum = membersNum;
        if (startStudyDay) updateChange.startStudyDay = startStudyDay;
        if (endStudyDay) updateChange.endStudyDay = endStudyDay;
        if (focusTimeStart) updateChange.focusTimeStart = focusTimeStart;
        if (focusTimeEnd) updateChange.focusTimeEnd = focusTimeEnd;
        if (roomTitle) updateChange.roomTitle = roomTitle;
        if (roomDesc) updateChange.roomDesc = roomDesc;
        if (hashTags) updateChange.hashTags = hashTags;

        console.log('router단', roomId, updateChange);
        const udatedInfo = await userStudyRoomsService.updateRoom({ roomId, updateChange });

        res.status(200).json(udatedInfo);
    } catch (error) {
        next(error);
    }
});

export { userStudyRoomsRouter };
