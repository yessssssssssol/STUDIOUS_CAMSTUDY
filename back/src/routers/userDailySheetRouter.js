import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { UserDailySheetService } from '../services/userDailySheetService';

const userDailySheetRouter = Router();

userDailySheetRouter.put('/dailysheet', login_required, async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const id = req.currentUserId;
        const timeGoal = req.body.timeGoal;

        const updatedGoal = await UserDailySheetService.updateTimeGoal({
            id,
            timeGoal,
        });

        res.status(200).json(updatedGoal);
    } catch (error) {
        next(error);
    }
});

// 새벽 5시 업데이트 확인용
userDailySheetRouter.post('/dailysheet', login_required, async function (req, res, next) {
    try {
        const madeSheets = await UserDailySheetService.createSheets();

        res.status(201).json(madeSheets);
    } catch (error) {
        next(error);
    }
});

export { userDailySheetRouter };
