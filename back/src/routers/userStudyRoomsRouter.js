import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { checkRoomId } from '../middlewares/checkRoomId';
import { uploadRoomImgHandler } from '../utils/multerForRoom';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { userStudyRoomsService } from '../services/userStudyRoomsService';
import { userAuthService } from '../services/userService';
// import { commentsService } from '../services/commentsService';
// import { get } from 'express/lib/request';

const userStudyRoomsRouter = Router();

// 스터디룸/게시글 생성
userStudyRoomsRouter.post('/studyroom', login_required, async function (req, res, next) {
    try {
        const id = req.currentUserId;
        const roomId = uuid().replace(/-/g, '');
        const now = dayjs();
        const group = true;

        let {
            roomName,
            membersOnly,
            membersNum,
            startStudyDay,
            endStudyDay,
            focusTimeStart,
            focusTimeEnd,
            roomTitle,
            roomDesc,
            hashTags,
        } = req.body;

        //마감 날짜
        let expiredAt = new Date(endStudyDay + ' 23:59:59');
        expiredAt.setHours(expiredAt.getHours() + 9);

        // membersOnly 형변환
        if ((membersOnly === 'False', membersOnly === 'false' || membersOnly === false)) {
            membersOnly = false;
            console.log('오픈룸 생성');
        } else if (membersOnly === 'true' || membersOnly === 'true' || membersOnly === true) {
            membersOnly = true;
            console.log('맴버온니룸 생성');
        } else {
            return res.status(400).json({ message: 'membersOnly 값을 제대로 입력해주세요.' });
        }

        // 내용이 잘 들어왔는지 확인
        if (
            roomName &&
            startStudyDay &&
            endStudyDay &&
            focusTimeStart &&
            focusTimeEnd &&
            roomTitle &&
            roomDesc &&
            hashTags === undefined
        ) {
            return res.status(400).json({ message: '방 정보를 제대로 입력해주세요' });
        }

        const newRoomInfo = {
            id,
            roomId,
            roomImg: '사진 정보가 없습니다.',
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
            members: [id],
            views: 0,
            createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: now.format('YYYY-MM-DD HH:mm:ss'),
            headCount: [],
            expiredAt,
        };

        const roomInfo = await userStudyRoomsService.createRoom({ newRoomInfo });

        return res.status(201).json(roomInfo);
    } catch (error) {
        next(error);
    }
});

// 스터디룸 사진 저장
userStudyRoomsRouter.put(
    '/roomimg/:roomId',
    login_required,
    uploadRoomImgHandler.single('roomImg'),
    async function (req, res, next) {
        try {
            const now = dayjs();
            if (!req.file) return res.status(400).json({ message: '업로드할 이미지가 없습니다.' });

            const { roomId } = req.params;
            if (!roomId) return res.status(400).json({ message: 'roomId가 넘어오지 않았습니다.' });

            const url = req.file.path;
            const updateChange = { roomImg: url, updatedAt: now.format('YYYY-MM-DD HH:mm:ss') };
            const createImg = await userStudyRoomsService.updateRoom({ roomId, updateChange });

            if (!createImg.roomImg || createImg.roomImg === '사진 정보가 없습니다.') {
                return res.status(400).json({ message: '이미지가 제대로 저장되지 않았습니다.' });
            }

            return res.status(200).send({ url: url });
        } catch (error) {
            next(error);
        }
    },
);

// 스터디룸/게시글 수정
userStudyRoomsRouter.put('/studyroom', login_required, async function (req, res, next) {
    try {
        let updateChange = {};
        const now = dayjs();
        const {
            roomId,
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
        } = req.body;

        // 오류처리
        if (!roomId) {
            return res.status(400).json({ message: 'roomId값은 필수입니다.' });
        }
        const validRoomId = await userStudyRoomsService.getRoom({ roomId });
        if (!validRoomId) {
            return res.status(400).json({ message: '존재하지 않는 스터디방입니다.' });
        }
        if (group || membersOnly || membersNum || startStudyDay) {
            return res.status(400).json({
                message: 'group, membersOnly, membersNum, startStudyDay값은 변경할 수 없습니다.',
            });
        }

        updateChange.updateAt = now.format('YYYY-MM-DD HH:mm:ss');
        if (roomName) updateChange.roomName = roomName;
        // if (startStudyDay) updateChange.startStudyDay = startStudyDay;
        if (endStudyDay) {
            //마감 날짜 변경
            let expiredAt = new Date(endStudyDay + ' 23:59:59');
            expiredAt.setHours(expiredAt.getHours() + 9);
            updateChange.endStudyDay = endStudyDay;
            updateChange.expiredAt = expiredAt;
        }
        if (focusTimeStart) updateChange.focusTimeStart = focusTimeStart;
        if (focusTimeEnd) updateChange.focusTimeEnd = focusTimeEnd;
        if (roomTitle) updateChange.roomTitle = roomTitle;
        if (roomDesc) updateChange.roomDesc = roomDesc;
        if (hashTags) updateChange.hashTags = hashTags;

        const udatedInfo = await userStudyRoomsService.updateRoom({ roomId, updateChange });

        return res.status(200).json(udatedInfo);
    } catch (error) {
        next(error);
    }
});

// 방장 변경
userStudyRoomsRouter.put('/changeroomleader', login_required, async function (req, res, next) {
    try {
        const id = req.currentUserId;
        const { roomId, idChangingToLeader } = req.body;
        if (!roomId || !idChangingToLeader)
            return res
                .status(400)
                .json({ message: 'roomId 혹은 idChangingToLeader가 넘어오지 않았습니다.' });

        const isRoom = await userStudyRoomsService.getRoom({ roomId });
        if (!isRoom || isRoom === [])
            return res.status(400).json({ message: '해당 스터디룸을 찾을 수 없습니다.' });

        if (id !== isRoom.id)
            return res.status(400).json({ message: '방장만 방장 권한을 넘겨줄 수 있습니다.' });

        //기존에 팀원인 사람 배열에서 삭제
        const curmebers = isRoom.members.filter((member) => member !== idChangingToLeader);

        const updateChange = { id: idChangingToLeader, members: [...curmebers, id] };

        const changedRoomAuth = await userStudyRoomsService.updateRoom({ roomId, updateChange });
        if (!changedRoomAuth) return res.status(400).json({ message: '변경에 실패했습니다.' });

        res.status(200).json(changedRoomAuth);
    } catch (error) {
        next(error);
    }
});

// 스터디룸 입장 및 퇴장(인원수)
userStudyRoomsRouter.put('/headcount', login_required, async function (req, res, next) {
    try {
        const id = req.currentUserId;
        const { roomId, attend } = req.body;
        if (!roomId) return res.status(400).json({ message: 'roomId값이 넘어오지 않았습니다.' });
        if (typeof attend !== 'boolean')
            return res.status(400).json({ message: 'attend값을 boolean형태로 보내주세요' });

        //방 정보 확인하기
        const curRoom = await userStudyRoomsService.getRoom({ roomId });
        if (!curRoom || curRoom === [])
            return res.status(400).json({ message: '존재하지 않은 roomId입니다.' });

        // 멤버온니룸에 들어올 경우 멤버인지 확인
        if (curRoom.membersOnly === true) {
            if (!curRoom.members.includes(id))
                return res.status(400).json({ message: '해당 멤버온니룸의 접근권한이 없습니다.' });
        }

        // 스터디룸에 들어오는 경우
        if (attend === true) {
            // 정원 확인
            if (curRoom.membersNum === curRoom.headCount.length)
                return res.status(403).json({ message: '현재 인원이 다 찼습니다.' });

            if (curRoom.headCount.includes(id))
                return res.status(400).json({ message: '이미 방에 들어와있는 id입니다.' });

            curRoom.headCount.push(id);
            const headCount = curRoom.headCount;
            const updateChange = { headCount };
            const newHeadCount = await userStudyRoomsService.updateRoom({ roomId, updateChange });
            if (!newHeadCount)
                return res.status(500).json({ message: 'headCount에 추가하지 못했습니다.' });
            return res.status(200).json(newHeadCount);
        }

        // 스터디룸에서 나가는 경우
        if (curRoom.headCount.length === 0)
            return res.status(400).json({ message: '이미 방에 아무도 없습니다.' });

        if (!curRoom.headCount.includes(id))
            return res.status(400).json({ message: '방에 id가 존재하지 않습니다.' });

        const headCount = curRoom.headCount.filter((userId) => id !== userId);
        const updateChange = { headCount };
        const newHeadCount = await userStudyRoomsService.updateRoom({ roomId, updateChange });
        if (!newHeadCount)
            return res.status(500).json({ message: 'headCount에 제거하지 못했습니다.' });
        return res.status(200).json(newHeadCount);
    } catch (error) {
        next(error);
    }
});

// 스터디룸 하나 가저오기(roomId를 통해)
userStudyRoomsRouter.get('/studyroom/:roomId', login_required, async function (req, res, next) {
    try {
        const { roomId } = req.params;

        if (!roomId) {
            return res.status(400).json({ message: 'roomId를 제대로 입력 해주세요.' });
        }

        const getInfo = await userStudyRoomsService.getRoom({ roomId });
        return res.status(200).json(getInfo);
    } catch (error) {
        next(error);
    }
});

// 조회수
userStudyRoomsRouter.put('/studyroom/view', login_required, async function (req, res, next) {
    try {
        const { roomId } = req.body;

        if (!roomId) {
            return res.status(400).json({ message: 'roomId를 제대로 입력 해주세요.' });
        }

        const getInfo = await userStudyRoomsService.getRoom({ roomId });
        if (typeof getInfo.views === 'number') {
            const views = Number(getInfo.views + 1);
            const updateChange = { views };
            const updateViews = await userStudyRoomsService.updateRoom({ roomId, updateChange });
            return res.status(200).json(updateViews);
        } else {
            return res
                .status(400)
                .json({ message: '오픈스터디룸과 멤버스터디룸만 조회수를 올릴 수 있습니다.' });
        }
    } catch (error) {
        next(error);
    }
});

// 내가 생성한 스터디룸 가저오기(id를 통해)
userStudyRoomsRouter.get('/studyrooms/:id', login_required, async function (req, res, next) {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: 'id를 제대로 입력 해주세요.' });
        const getInfo = await Promise.all([
            userStudyRoomsService.getRooms({ id }),
            userStudyRoomsService.getOtherRooms({ id }),
        ]).then((result) => [result[0], result[1]]);

        //중복 제거
        let ar1 = getInfo[0];
        let ar2 = getInfo[1];
        getInfo[0].map((sheet0) => {
            getInfo[1].map((sheet1) => {
                if (sheet0.roomId === sheet1.roomId) {
                    ar2 = ar2.filter((sheet) => sheet.roomId !== sheet0.roomId);
                }
            });
        });

        const getInfoAr = ar1.concat(ar2);
        return res.status(200).json(getInfoAr);
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

        return res.status(200).json(getInfo);
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

        console.log(getInfo);

        //map 비동기 처리하려면 Promise.all로 감싸줘야 한다.
        const imgList = await Promise.all(
            getInfo.map(async (room) => {
                const user_id = room.id;
                let imgUrl = await userAuthService
                    .getUserInfo({ user_id })
                    .then((userInfo) => userInfo.profileUrl);
                return imgUrl;
            }),
        );

        let mergedList = [];
        for (let i = 0; i < getInfo.length; i++) {
            const idImg = imgList[i];
            const mergedElem = { ...getInfo[i].toObject(), idImg };
            mergedList.push(mergedElem);
        }

        console.log(mergedList);

        return res.status(200).json(mergedList);
    } catch (error) {
        next(error);
    }
});

// 스터디룸 삭제(roomId를 통해)
userStudyRoomsRouter.delete('/deleteroom/:roomId', login_required, async function (req, res, next) {
    try {
        const roomId = req.params.roomId;
        const id = req.currentUserId;

        if (!roomId || !id) {
            return res.status(400).json({ message: 'roomId를 제대로 입력 해주세요.' });
        }

        await userStudyRoomsService.delRoom({ id, roomId });
        return res.status(200).json({ result: 'success' });
    } catch (error) {
        next(error);
    }
});

// 모든 스터디룸 배열 가져오기

export { userStudyRoomsRouter };
