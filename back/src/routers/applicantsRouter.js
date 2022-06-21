import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import dayjs from 'dayjs';
import { applicantsService } from '../services/applicantsService';
import { userStudyRoomsService } from '../services/userStudyRoomsService';
import { userAuthService } from '../services/userService';

const applicantsRouter = Router();

// 맴버온니 스터디룸 신청
applicantsRouter.post('/apply', login_required, async function (req, res, next) {
    try {
        const now = dayjs();
        const createdAt = now.format('YYYY-MM-DD HH:mm:ss');
        const applicantId = req.currentUserId;
        const { roomId } = req.body;

        if (!roomId) return res.status(400).json({ message: 'roomId를 입력해주세요.' });

        const checkRoomId = await userStudyRoomsService.getRoom({ roomId });
        if (!checkRoomId) return res.status(400).json({ message: '해당하는 방을 찾을 수 없습니다.' });

        if (!checkRoomId.membersOnly) return res.status(400).json({ message: '멤버 온니 스터디방이 아닙니다. 멤버 온니 스터디 방만 신청할 수 없습니다.' });

        if (checkRoomId.id === applicantId) return res.status(400).json({ message: '자신이 만든 방에 참가 신청 요청을 할 수 없습니다.' });

        const checkOverlapping = await applicantsService.checkOverlapping({ applicantId, roomId });
        if (checkOverlapping) return res.status(400).json({ message: '이미 신청했습니다.' });

        // 멤버 중복 확인
        let findOverLap = false;
        checkRoomId.members.map((user) => {
            if (user === applicantId) {
                findOverLap = true;
                return;
            }
        });
        if (findOverLap) return res.status(400).json({ message: '이미 멤버입니다.' });

        const application = {
            roomId,
            applicantId,
            createdAt,
        };

        const applicants = await applicantsService.create({ application });
        return res.status(201).json(applicants);
    } catch (error) {
        next(error);
    }
});

// 신청자 승인(방장권한)
applicantsRouter.put('/apply/check', login_required, async function (req, res, next) {
    try {
        const id = req.currentUserId;
        const { roomId, applicantId } = req.body;

        if (!applicantId || !roomId) return res.status.json({ message: 'appicantIds나 roomId가 넘어오지 않았습니다.' });

        // 이 방의 방장인가?
        const checkRoom = await userStudyRoomsService.getRoom({ roomId });
        if (!checkRoom) return res.status(400).json({ message: '해당하는 방을 찾을 수 없습니다.' });
        if (checkRoom.id !== id) return res.status(400).json({ message: '이 방의 방장이 아닙니다. 신청자 승인 권한이 없습니다.' });

        // 멤버 중복 확인
        let findOverLap = false;
        checkRoom.members.map((user) => {
            if (user === applicantId) {
                findOverLap = true;
                return;
            }
        });
        if (findOverLap) return res.status(400).json({ message: '이미 멤버입니다.' });

        //방 멤버에 추가 후 신청 삭제
        const updateChange = { members: [...checkRoom.members, applicantId] };
        let addmember = undefined;
        await Promise.all([applicantsService.delete({ applicantId, roomId }), userStudyRoomsService.addMember({ roomId, updateChange })]).then((result) => (addmember = result[1].members));

        return res.status(200).json({ message: '성공적으로 스터디룸 멤버에 추가되었습니다.', roomMembers: addmember });
    } catch (error) {
        next(error);
    }
});

// 신청자 리스트 가져오기
applicantsRouter.get('/applicants/:roomId', login_required, async function (req, res, next) {
    try {
        const { roomId } = req.params;
        if (!roomId) return res.status(400).json({ message: 'roomId 를 파라미터를 통해 보내주세요.' });

        const applicantsList = await applicantsService.getLists({ roomId });
        if (!applicantsList) return res.status(500).json({ message: '리스트를 불러오지 못했습니다.' });

        const applicantsListWithName = await Promise.all(
            applicantsList.map(async (applicant) => {
                const user_id = applicant.applicantId;
                const userName = await userAuthService.getUserInfo({ user_id }).then((info) => info.name);
                return { userName, ...applicant.toObject() };
            }),
        );

        return res.status(200).json(applicantsListWithName);
    } catch (error) {
        next(error);
    }
});

//신청자거절(방장)/신청취소(신청자)
applicantsRouter.delete('/apply/:roomId/:applicantId', login_required, async function (req, res, next) {
    try {
        const { roomId, applicantId } = req.params;
        if (!roomId || !applicantId) return res.status(400).json({ message: 'roomId 혹은 applicantId를 파라미터를 통해 보내주세요.' });

        const deletedApplication = await applicantsService.delete({ applicantId, roomId });
        if (!deletedApplication) return res.status(400).json({ message: '삭제가 정상적으로 되지 않았습니다.' });

        return res.status(200).json({ message: '성공적으로 신청자 리스트에서 삭제되었습니다.', deletedApplication });
    } catch (error) {
        next();
    }
});

//멤버 강제 퇴장 기능
applicantsRouter.delete('/appliant/:roomId/:applicantId', login_required, async function (req, res, next) {
    try {
        const id = req.currentUserId;
        const { roomId, applicantId } = req.params;
        if (!roomId || !applicantId) return res.status(400).json({ message: 'roomId 혹은 applicantId를 파라미터를 통해 보내주세요.' });

        // 이 방의 방장인가?
        const checkRoom = await userStudyRoomsService.getRoom({ roomId });
        if (!checkRoom) return res.status(400).json({ message: '해당하는 방을 찾을 수 없습니다.' });
        if (checkRoom.id !== id) return res.status(400).json({ message: '이 방의 방장이 아닙니다. 멤버 퇴장 권한이 없습니다.' });

        // 삭제할 멤버가 배열 안에 있는지 확인

        const members = checkRoom.members.filter((user) => user !== applicantId);
        const updateChange = { members };
        console.log(updateChange);
        const delMember = await userStudyRoomsService.delMember({ roomId, updateChange }).then((result) => result.members);
        if (!delMember) return res.status(500).json({ message: ' 해당 멤버를 퇴장시키지 못했습니다.' });

        return res.status(200).json({ message: '성공적으로 스터디룸 멤버에서 제거되었습니다.', roomMembers: delMember });
    } catch (error) {
        next(error);
    }
});

export { applicantsRouter };
