import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { UserDailySheetService } from '../services/userDailySheetService';

const userDailySheetRouter = Router();

userDailySheetRouter.put('/dailysheet', login_required, async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const user_id = req.body.id;
        const timeGoal = req.body.timeGoal;

        const newLog = await timeLogService.addTimeLog({
            user_id,
        });

        if (newLog.timeLog.errorMessage) {
            throw new Error(newLog.timeLog.errorMessage);
        } else if (newLog.updatedSheet.errorMessage) {
            throw new Error(newLog.updatedSheet.errorMessage);
        }

        res.status(201).json(newLog);
    } catch (error) {
        next(error);
    }
});

export { userDailySheetRouter };
