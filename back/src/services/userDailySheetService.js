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
        const { beginStudyTime } = getSheet;

        // 금일 데일리 시트에 아무 정보도 없는 상태일 때
        if (beginStudyTime === ' ') {
            const beginStudyTime = startTime;
            const finishStudyTime = endTime;
            const studyTimeADay = studyTimeStr;
            const bestStudyTime = studyTimeStr;

            const updatedSheet = UserDailySheet.updateSheet({ id, beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime });
            return updatedSheet;
        }

        // 금일 데일리 시트에 정보가 있는 경우
        const studyTimeADayNum = ChangeDate.toMilliseconds(getSheet.studyTimeADay);
        const bestStudyTimeNum = ChangeDate.toMilliseconds(getSheet.bestStudyTime);

        const finishStudyTime = endTime;
        const studyTimeADay = ChangeDate.toStringTime(studyTimeNum + studyTimeADayNum);
        const bestStudyTime = ChangeDate.toStringTime(Math.max(studyTimeNum, bestStudyTimeNum));

        const updatedSheet = UserDailySheet.updateSheet({ id, beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime });
        return updatedSheet;
    }
}

export { UserDailySheetService };
