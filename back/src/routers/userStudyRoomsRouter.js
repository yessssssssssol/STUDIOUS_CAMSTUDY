import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { uploadRoomImgHandler } from '../utils/multerForRoom';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { userStudyRoomsService } from '../services/userStudyRoomsService';

const userStudyRoomsRouter = Router();

// 스터디룸/게시글 생성
userStudyRoomsRouter.post('/studyroom', login_required, async function (req, res, next) {
    try {
        const id = req.currentUserId;
        const roomId = uuid().replace(/-/g, '');
        let newRoomInfo = {};
        const now = dayjs();

        const { roomName, group, membersOnly, membersNum, startStudyDay, endStudyDay, focusTimeStart, focusTimeEnd, roomTitle, roomDesc, hashTags } = req.body;

        if (group === false) {
            // 개인 룸
            if (roomName && startStudyDay && endStudyDay && focusTimeStart && focusTimeEnd === undefined) {
                return '방 정보를 제대로 입력해주세요';
            }
            newRoomInfo = {
                id,
                roomId,
                roomImg: '사진 정보가 없습니다.',
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

// 스터디룸 사진 저장
userStudyRoomsRouter.put('/roomimg/:roomId', uploadRoomImgHandler.single('roomImg'), async function (req, res, next) {
    try {
        if (!req.file) {
            res.status(400).json({ message: '업로드할 이미지가 없습니다.' });
            return;
        }

        const { roomId } = req.params;
        const url = req.file.path;
        console.log(roomId, url);
        const updateChange = { roomImg: url };
        const createImg = await userStudyRoomsService.updateRoom({ roomId, updateChange });

        if (!createImg.roomImg || createImg.roomImg === '사진 정보가 없습니다.') {
            const errorMessage = '이미지가 제대로 저장되지 않았습니다.';
            console.log(errorMessage);
            return errorMessage;
        }

        res.status(200).send({ url: url });
    } catch (error) {
        next(error);
    }
});

// 스터디룸/게시글 수정
userStudyRoomsRouter.put('/studyroom', login_required, async function (req, res, next) {
    try {
        let updateChange = {};
        const now = dayjs();
        const { roomId, roomName, group, membersOnly, membersNum, startStudyDay, endStudyDay, focusTimeStart, focusTimeEnd, roomTitle, roomDesc, hashTags } = req.body;

        updateChange.updateAt = now.format('YYYY-MM-DD HH:mm:ss');
        if (roomName) updateChange.roomName = roomName;
        if (membersNum) updateChange.membersNum = membersNum;
        if (startStudyDay) updateChange.startStudyDay = startStudyDay;
        if (endStudyDay) updateChange.endStudyDay = endStudyDay;
        if (focusTimeStart) updateChange.focusTimeStart = focusTimeStart;
        if (focusTimeEnd) updateChange.focusTimeEnd = focusTimeEnd;
        if (roomTitle) updateChange.roomTitle = roomTitle;
        if (roomDesc) updateChange.roomDesc = roomDesc;
        if (hashTags) updateChange.hashTags = hashTags;

        const udatedInfo = await userStudyRoomsService.updateRoom({ roomId, updateChange });

        res.status(200).json(udatedInfo);
    } catch (error) {
        next(error);
    }
});

// 스터디룸 하나 가저오기(roomId를 통해)
userStudyRoomsRouter.get('/studyroom/:roomId', login_required, async function (req, res, next) {
    try {
        const roomId = req.params.roomId;

        const getInfo = await userStudyRoomsService.getRoom({ roomId });
        if (typeof getInfo.views === 'number') {
            const views = Number(getInfo.views + 1);
            const updateChange = { views };
            const updateViews = await userStudyRoomsService.updateRoom({ roomId, updateChange });
            res.status(200).json(updateViews);
            return;
        }
        res.status(200).json(getInfo);
    } catch (error) {
        next(error);
    }
});

// 내가 생성한 스터디룸 가저오기(id를 통해)
userStudyRoomsRouter.get('/studyrooms/:id', login_required, async function (req, res, next) {
    try {
        const id = req.params.id;
        const getInfo = await userStudyRoomsService.getRooms({ id });

        res.status(200).json(getInfo);
    } catch (error) {
        next(error);
    }
});

// 오픈 스터디룸 가저오기
userStudyRoomsRouter.get('/open/studyrooms', login_required, async function (req, res, next) {
    try {
        const group = true;
        const membersOnly = false;
        const getInfo = await userStudyRoomsService.getOpenRooms({ group, membersOnly });

        res.status(200).json(getInfo);
    } catch (error) {
        next(error);
    }
});

// 멤버온니 스터디룸 가져오기
userStudyRoomsRouter.get('/memberonly/studyrooms', login_required, async function (req, res, next) {
    try {
        const group = true;
        const membersOnly = true;
        const getInfo = await userStudyRoomsService.getOpenRooms({ group, membersOnly });

        res.status(200).json(getInfo);
    } catch (error) {
        next(error);
    }
});

// 스터디룸 삭제(roomId를 통해)
userStudyRoomsRouter.delete('/deleteroom/:roomId', login_required, async function (req, res, next) {
    try {
        const roomId = req.params.roomId;
        const id = req.currentUserId;
        await userStudyRoomsService.delRoom({ id, roomId });
        return res.status(200).json({ result: 'success' });
    } catch (error) {
        next(error);
    }
});

// 모든 스터디룸 배열 가져오기

export { userStudyRoomsRouter };
