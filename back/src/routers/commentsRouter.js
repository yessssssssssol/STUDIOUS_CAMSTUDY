import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { commentsService } from '../services/commentsService';
import { userAuthService } from '../services/userService';
import dayjs from 'dayjs';

const commentsRouter = Router();

// 댓글 생성
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

        return res.status(201).json(Comment);
    } catch (error) {
        next(error);
    }
});

// 댓글 수정
commentsRouter.put('/comment', login_required, async function (req, res, next) {
    try {
        const now = dayjs();
        const writerId = req.currentUserId;
        const { _id, content } = req.body;
        if (!_id || !content) {
            return res.status(400).json({ message: '_id혹은 content가 넘어오지 않았습니다.' });
        }

        const writerIdValid = await commentsService.getOne({ _id }).then((data) => data.writerId);
        if (writerId !== writerIdValid) {
            return res.status(400).json('자신의 댓글만 수정할 수 있습니다.');
        }

        const updateChange = {
            content,
            updatedAt: now.format('YYYY-MM-DD HH:mm:ss'),
        };

        const updatedComment = await commentsService.update({ _id, updateChange });
        if (!updateChange) {
            return res.status(400).json('댓글 수정에 실패했습니다.');
        }

        return res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
});

//게시글 댓글 리스트 가져오기
commentsRouter.get('/comments/:roomId', login_required, async function (req, res, next) {
    try {
        const { roomId } = req.params;
        const commentList = await commentsService.getAll({ roomId });
        if (!commentList) {
            return res.status(500).json('댓글 목록을 가져오는데 실패했습니다.');
        }
        // 댓글 정보에 맞는 이름 가져오기
        const commentListWithName = await Promise.all(
            commentList.map(async (comment) => {
                // 댓글 쓴 사람 이름 가져오기
                let user_id = comment.writerId;
                const userName = await userAuthService.getUserInfo({ user_id }).then((info) => info.name);
                const userInfo = await userAuthService.getUserInfo({ user_id });
                // 댓글 타겟이 된 사람 이름 적어오기
                user_id = comment.targetId;
                let targetName = null;
                if (user_id) {
                    targetName = await userAuthService.getUserInfo({ user_id }).then((info) => info.name);
                }
                return { userName, targetName, ...comment.toObject(), userInfo };
            }),
        );

        return res.status(200).json(commentListWithName);
    } catch (error) {
        next(error);
    }
});

// 댓글 하나 가져오기
commentsRouter.get('/comment/:_id', login_required, async function (req, res, next) {
    try {
        const { _id } = req.params;
        const comment = await commentsService.getOne({ _id });
        let user_id = comment.writerId;
        console.log(user_id);
        const userName = await userAuthService.getUserInfo({ user_id }).then((info) => info.name);
        const userInfo = await userAuthService.getUserInfo({ user_id });
        user_id = comment.targetId;
        let targetName = null;
        if (user_id) {
            targetName = await userAuthService.getUserInfo({ user_id }).then((info) => info.name);
        }
        // console.log('comment 타입입니다.\n', typeof comment);
        // console.log('comment 로그입니다.\n', comment);
        // const commentWithName = { name: userName, ...comment };
        // console.log('commentWithName 로그입니다.\n', commentWithName);

        return res.status(200).json({ userName, targetName, ...comment.toObject(), userInfo });
    } catch (error) {
        next(error);
    }
});

commentsRouter.delete('/comment/:_id', login_required, async function (req, res, next) {
    try {
        const writerId = req.currentUserId;
        const { _id } = req.params;
        if (!_id) {
            return res.status(400).json('_id가 넘어오지 않았습니다.');
        }

        const writerIdValid = await commentsService.getOne({ _id }).then((data) => data.writerId);
        if (writerId !== writerIdValid) {
            return res.status(400).json('자신의 댓글만 삭제할 수 있습니다.');
        }

        const deletedComment = await commentsService.delete({ _id });
        if (!deletedComment) {
            return res.status(400).json('댓글 삭제에 실패했습니다.');
        }
        return res.status(200).json({ result: 'success' });
    } catch (error) {
        next(error);
    }
});

export { commentsRouter };
