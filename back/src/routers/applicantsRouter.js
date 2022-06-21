import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import dayjs from 'dayjs';
import { applicantsService } from '../services/applicantsService';
import { userStudyRoomsService } from '../services/userStudyRoomsService';

const applicantsRouter = Router();

// 댓글 생성
applicantsRouter.post('/apply', login_required, async function (req, res, next) {
    try {
        const now = dayjs();
        const createdAt = now.format('YYYY-MM-DD HH:mm:ss');
        const applicantId = req.currentUserId;
        const { roomId } = req.body;

        if (!roomId) {
            return res.status(400).json({ message: 'roomId를 입력해주세요.' });
        }

        const checkRoomId = await userStudyRoomsService.getRoom({ roomId });
        if (!checkRoomId) {
            return res.status(400).json({ message: '해당하는 방을 찾을 수 없습니다.' });
        }

        if (!checkRoomId.membersOnly) {
            return res.status(400).json({ message: '멤버 온니 스터디방이 아닙니다. 멤버 온니 스터디 방만 신청할 수 있습니다.' });
        }

        const checkOverlapping = await applicantsService.checkOverlapping({ roomId });
        if (checkOverlapping) {
            return res.status(400).json({ message: '이미 신청했습니다.' });
        }

        const application = {
            roomId,
            applicantId,
            status: false,
            createdAt,
        };

        const applicants = await applicantsService.create({ application });
        return res.status(201).json(applicants);
    } catch (error) {
        next(error);
    }
});

export { applicantsRouter };
