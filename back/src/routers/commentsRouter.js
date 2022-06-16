import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { commentsService } from '../services/commentsService';
import dayjs from 'dayjs';
import { userAuthService } from '../services/userService';

const commentsRouter = Router();

commentsRouter.post('/comment', login_required, async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
        }
        const now = dayjs();
        const writerId = req.currentUserId;
        const { targetId, roomId, content } = req.body;
        let newComment = {
            writerId,
            roomId,
            content,
            createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: now.format('YYYY-MM-DD HH:mm:ss'),
        };

        if (targetId) {
            const user_id = targetId;
            const targetedId = await userAuthService.getUserInfo({ user_id });
            if (targetedId.errorMessage) throw new Error(targetedId.errorMessage);
            newComment.targetId = targetedId.id;
        }
        const Comment = await commentsService.create({ newComment });

        res.status(201).json(Comment);
    } catch (error) {
        next(error);
    }
});

export { commentsRouter };
