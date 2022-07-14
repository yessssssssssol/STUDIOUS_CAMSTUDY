import { TimeLog } from '../db/models/TimeLog';
import { User } from '../db';
import { ChangeDate } from '../utils/changeDate';
import { UserDailySheetService } from './userDailySheetService';
import { TotalTimeService } from './totalTimeService';

/**
 *  시간 트래킹, 저장 관련 기능
 */
class timeLogService {
    /**
     * 타임로그 생성
     * @param {{user_id: string, beginTime: string, finishTime: string}} IdBeginAndFinish - (user_id, beginTime, finishTime)
     */
    static async addTimeLog({ user_id, startTime, endTime }) {
        const userId = await User.findById({ user_id });
        if (!userId) {
            const errorMessage = '회원이 아닙니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        const { startTimeNum, endTimeNum, studyTimeNum, studyTimeStr } = ChangeDate.findDate(
            startTime,
            endTime,
        );

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
        if (!timeLog) {
            const errorMessage = '로그를 제대로 저장하지 못했습니다.';
            return { errorMessage };
        }

        const updatedSheet = await UserDailySheetService.updateSheet({ newLog });
        if (!updatedSheet) {
            const errorMessage = '데일리 시트를 제대로 업데이트 하지 못했습니다.';
            return { errorMessage };
        }
        const updatedTotalTime = await TotalTimeService.update({ user_id });
        if (!updatedTotalTime) {
            const errorMessage = '전체 공부시간을 제대로 업데이트 하지 못했습니다.';
            return { errorMessage };
        }

        return { timeLog, updatedSheet };
    }

    /**
     * 타임로그 리스트 불러오기 (하루치)
     * @param {{user_id: string, date: string}} IdAndDate - (user_id, date)
     */
    static async getTimeLogs({ user_id, date }) {
        const userId = await User.findById({ user_id });
        if (!userId) {
            const errorMessage = '회원이 아닙니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        const beginTime = new Date(
            `${date.slice(0, 4)}/${date.slice(5, 7)}/${date.slice(8)}/05:00:00`,
        ).getTime();
        const finishTime = beginTime + 86400000;

        const studyLogADay = await TimeLog.findAllADay({ user_id, beginTime, finishTime });
        if (!studyLogADay || studyLogADay.length === 0) {
            const message = '금일 공부한 이력이 없습니다.';
            return { message };
        }

        return studyLogADay;
    }
}

export { timeLogService };
