import { User, UserDailySheet } from '../db';
import dayjs from 'dayjs';
import { ChangeDate } from '../utils/changeDate';

class UserDailySheetService {
    // 5시 마다 새로운 데일리 시트 만들기
    static async createSheets() {
        // 날짜 가져오기
        const now = dayjs();
        const today = now.format('YYYY-MM-DD');
        const yesterday = now.add(-1, 'day').format().slice(0, 10);
        // 유저 데일리 시트에 있는 최근 목표 공부 시간을 가져와서 배열로 만들어야 함
        const userSheets = await UserDailySheet.getSheets({ yesterday });
        if (userSheets === []) {
            const errorMessage = '새로 데일리 시트를 만들 때 필요한 전날 데일리 시트 데이터가 없습니다.';
            return { errorMessage };
        }
        const newSheets = userSheets.map((sheet) => {
            const { id, timeGoal } = sheet;
            return {
                id,
                date: today,
                timeGoal,
                studyTimeADay: ' ',
                bestStudyTime: ' ',
                beginStudyTime: ' ',
                finishStudyTime: ' ',
            };
        });

        await UserDailySheet.addSheets({ newSheets });
        return '금일 사용자 데일리 시트가 성공적으로 생성 되었습니다.';
    }

    // 공부로그req가 들어오면 동시에 해당 사용자 데일리 시트도 업데이트하기
    static async updateSheet({ newLog }) {
        const { id, startTime, endTime, studyTimeNum, studyTimeStr } = newLog;

        const date = ChangeDate.getCurrentDate(startTime);

        const getSheet = await UserDailySheet.getSheet({ id, date });
        const { timeGoal, studyTimeADay, bestStudyTime, beginStudyTime, finishStudyTime } = getSheet;

        // 금일 데일리 시트에 아무 정보도 없는 상태일 때
        if (beginStudyTime === ' ') {
            beginStudyTime = startTime;
            finishStudyTime = endTime;
            studyTimeADay = studyTimeStr;
            bestStudyTime = studyTimeStr;

            const updatedSheet = UserDailySheet.updateSheet({ id, beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime });
            return updatedSheet;
        }

        // 금일 데일리 시트에 정보가 있는 경우
        const studyTimeADayNum = ChangeDate.toMilliseconds(studyTimeADay);
        const bestStudyTimeNum = ChangeDate.toMilliseconds(bestStudyTime);

        finishStudyTime = endTime;
        studyTimeADay = ChangeDate.toStringTime(studyTimeNum + studyTimeADayNum);
        bestStudyTime = ChangeDate.toStringTime(Math.max(studyTimeNum, bestStudyTimeNum));

        const updatedSheet = UserDailySheet.updateSheet({ id, beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime });
        return updatedSheet;
    }
    // static async getTimeLogs({ user_id, date }) {
    //     const userId = await User.findById({ user_id });
    //     if (!userId) {
    //         const errorMessage = '회원이 아닙니다. 다시 한 번 확인해 주세요.';
    //         return { errorMessage };
    //     }

    //     const beginTime = new Date(`${date.slice(0, 4)}/${date.slice(5, 7)}/${date.slice(8)}/05:00:00`).getTime();
    //     const finishTime = beginTime + 86400000;

    //     const studyLogADay = await TimeLog.findAllADay({ user_id, beginTime, finishTime });
    //     if (!studyLogADay || studyLogADay.length === 0) {
    //         const errorMessage = '금일 공부한 이력이 없습니다.';
    //         return { errorMessage };
    //     }

    //     return studyLogADay;
    // }
}

export { UserDailySheetService };
