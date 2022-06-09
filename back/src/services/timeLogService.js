import { TimeLog } from '../db/models/TimeLog';
import { User } from '../db';
import { ChangeDate } from '../utils/changeDate';
import { UserDailySheetService } from './userDailySheetService';

class timeLogService {
    static async addTimeLog({ user_id, startTime, endTime }) {
        const userId = await User.findById({ user_id });
        if (!userId) {
            const errorMessage = '회원이 아닙니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        const { startTimeNum, endTimeNum, studyTimeNum, studyTimeStr } = ChangeDate.findDate(startTime, endTime);

        const newLog = {
            id: user_id,
            startTime,
            endTime,
            startTimeNum,
            endTimeNum,
            studyTimeNum,
            studyTimeStr,
        };

        const timeLog = await TimeLog.create({ newLog });
        timeLog.errorMessage = null;

        const updatedSheet = await UserDailySheetService.updateSheet({ newLog });
        updatedSheet.errorMessage = null;

        return { timeLog, updatedSheet };
    }

    static async getTimeLogs({ user_id, date }) {
        const userId = await User.findById({ user_id });
        if (!userId) {
            const errorMessage = '회원이 아닙니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        const beginTime = new Date(`${date.slice(0, 4)}/${date.slice(5, 7)}/${date.slice(8)}/05:00:00`).getTime();
        const finishTime = beginTime + 86400000;

        const studyLogADay = await TimeLog.findAllADay({ user_id, beginTime, finishTime });
        if (!studyLogADay || studyLogADay.length === 0) {
            const errorMessage = '금일 공부한 이력이 없습니다.';
            return { errorMessage };
        }

        return studyLogADay;
    }
}

export { timeLogService };
