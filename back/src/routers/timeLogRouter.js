import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { timeLogService } from '../services/timeLogService';

const timeLogRouter = Router();

timeLogRouter.post('/timelog', login_required, async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const user_id = req.currentUserId;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;

        const newLog = await timeLogService.addTimeLog({
            user_id,
            startTime,
            endTime,
        });

        res.status(201).json(newLog);
    } catch (error) {
        next(error);
    }
});

timeLogRouter.get('/timelogs/:id/:date', login_required, async function (req, res, next) {
    try {
        const user_id = req.params.id;
        const date = req.params.date;
        // YYYY-MM-DD
        // 0123456789
        if (!user_id) {
            const errorMessage = '아이디가 제대로 넘어오지 않았습니다.';
            return errorMessage;
        }
        if (!date) {
            const errorMessage = '날짜가 제대로 넘어오지 않았습니다';
            return errorMessage;
        }

        const logList = await timeLogService.getTimeLogs({ user_id, date });
        if (logList.errorMessage) {
            throw new Error(logList.errorMessage);
        }

        res.status(200).json(logList);
    } catch (error) {
        next(error);
    }
});

export { timeLogRouter };
