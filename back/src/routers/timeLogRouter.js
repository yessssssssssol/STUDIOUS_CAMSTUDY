import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { timeLogService } from '../services/timeLogService';
import { checkTimeFrom } from '../utils/checkHHMMSS';

const timeLogRouter = Router();

// 공부시간 저장(타임로그 생성)
timeLogRouter.post('/timelog', login_required, async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const user_id = req.currentUserId;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;

        if (!startTime || !endTime) {
            return res
                .status(400)
                .json({ message: '시작 시간 혹은 끝나는 시간이 제대로 들어오지 않았습니다.' });
        }

        const checkStart = checkTimeFrom(startTime);
        const checkEnd = checkTimeFrom(endTime);

        if (!checkStart || !checkEnd) {
            res.status(400).json({
                message: '시간이 YYYY-MM-DD HH:mm:ss형식으로 들어와야 합니다!',
            });
        }

        const newLog = await timeLogService.addTimeLog({
            user_id,
            startTime,
            endTime,
        });

        return res.status(201).json(newLog);
    } catch (error) {
        next(error);
    }
});

timeLogRouter.get('/timelogs/:date/:id', login_required, async function (req, res, next) {
    try {
        const user_id = req.params.id;
        const date = req.params.date;
        // YYYY-MM-DD
        // 0123456789
        if (!user_id || !date) {
            return res
                .status(400)
                .json({ message: '아이디 혹은 날짜가 제대로 넘어오지 않았습니다.' });
        }

        const logList = await timeLogService.getTimeLogs({ user_id, date });

        return res.status(200).json(logList);
    } catch (error) {
        next(error);
    }
});

export { timeLogRouter };
