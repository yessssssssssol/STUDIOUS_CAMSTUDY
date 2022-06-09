import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { UserDailySheetService } from '../services/userDailySheetService';

const userDailySheetRouter = Router();

userDailySheetRouter.put('/dailysheet', login_required, async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const id = req.body.id;
        const date = req.body.date;
        const timeGoal = req.body.timeGoal;

        const updatedGoal = await UserDailySheetService.updateTimeGoal({
            id,
            date,
            timeGoal,
        });

        res.status(201).json(updatedGoal);
    } catch (error) {
        next(error);
    }
});

export { userDailySheetRouter };
