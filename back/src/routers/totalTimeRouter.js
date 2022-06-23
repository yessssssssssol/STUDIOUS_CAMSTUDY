import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { totalTimeService } from '../services/totalTimeService';

const totalTimeRouter = Router();

totalTimeRouter.get('/totaltimes', login_required, async function (req, res, next) {
    try {
        console.log('hi');
        const totalTimes = await totalTimeService.getAll();
        console.log('hi');
        res.status(200).send(totalTimes);
    } catch (error) {
        next(error);
    }
});

export { totalTimeRouter };
