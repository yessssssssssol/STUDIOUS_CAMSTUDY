import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { UserDailySheetService } from '../services/userDailySheetService';

const userDailySheetRouter = Router();

// 새벽 5시 업데이트 확인용
userDailySheetRouter.post('/dailysheet', login_required, async function (req, res, next) {
    try {
        const madeSheets = await UserDailySheetService.createSheets();

        res.status(201).json(madeSheets);
    } catch (error) {
        next(error);
    }
});

// 유저 데일리 시트 전체 가져오기
userDailySheetRouter.get('/dailysheets/:id', login_required, async function (req, res, next) {
    try {
        const id = req.params.id;

        const getSheets = await UserDailySheetService.getSheets({ id });

        res.status(200).json(getSheets);
        return;
    } catch (error) {
        next(error);
    }
});

// 유저 데일리 시트 전체 가져 총 공부시간, 이번주 공부 시간 금일 공부시간 계산해서 가져오기
userDailySheetRouter.get('/totaltime/:id', login_required, async function (req, res, next) {
    try {
        const id = req.params.id;

        if (!id) {
            const errorMessage = '아이디가 제대로 넘어오지 않았습니다.';
            return errorMessage;
        }

        const getSheetsForCal = await UserDailySheetService.getSheetsForCal({ id });

        res.status(200).json(getSheetsForCal);
        return;
    } catch (error) {
        next(error);
    }
});

// 목표 공부 시간 변경
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

export { userDailySheetRouter };
