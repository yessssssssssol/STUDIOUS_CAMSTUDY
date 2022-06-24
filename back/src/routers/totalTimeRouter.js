import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { TotalTimeService } from '../services/totalTimeService';

const totalTimeRouter = Router();

totalTimeRouter.get('/totaltimes', login_required, async function (req, res, next) {
    try {
        const totalTimes = await TotalTimeService.getAll();
        res.status(200).send(totalTimes);
    } catch (error) {
        next(error);
    }
});

totalTimeRouter.get('/totaltimes/ranking', async function (req, res, next) {
    try {
        const totalTimesRanking = await TotalTimeService.getRanking({});
        res.status(200).send(totalTimesRanking);
    } catch (error) {
        next(error);
    }
});

export { totalTimeRouter };
