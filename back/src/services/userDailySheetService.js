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
                achievementRate: 0,
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
        const { timeGoal, beginStudyTime } = getSheet;
        console.log(getSheet);
        console.log(getSheet.studyTimeADay);
        console.log(studyTimeNum, studyTimeStr);

        // 금일 데일리 시트에 아무 정보도 없는 상태일 때
        if (beginStudyTime === ' ') {
            const beginStudyTime = startTime;
            const finishStudyTime = endTime;
            const studyTimeADay = studyTimeStr;
            const bestStudyTime = studyTimeStr;
            const achievementRate = 0;

            const updatedSheet = UserDailySheet.updateSheet({ id, date, beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime, achievementRate });
            return updatedSheet;
        }

        // 금일 데일리 시트에 정보가 있는 경우
        const studyTimeADayNum = ChangeDate.toMilliseconds(getSheet.studyTimeADay);
        const bestStudyTimeNum = ChangeDate.toMilliseconds(getSheet.bestStudyTime);
        console.log(studyTimeADayNum);
        console.log(ChangeDate.toStringTime(studyTimeADayNum));

        const finishStudyTime = endTime;
        const studyTimeADay = ChangeDate.toStringTime(studyTimeNum + studyTimeADayNum);
        const bestStudyTime = ChangeDate.toStringTime(Math.max(studyTimeNum, bestStudyTimeNum));

        const achievementRate = undefined;
        if (timeGoal === '아직 목표 공부시간을 설정하지 않았습니다.') {
            this.updateSheet.achievementRate = 0;
        } else {
            const timeGoalNum = ChangeDate.toMilliseconds(timeGoal);
            this.updateSheet.achievementRate = Number((studyTimeADay / timeGoalNum) * 100).toFixed(2);
        }

        // console.log(id, date, beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime, achievementRate);
        const updatedSheet = UserDailySheet.updateSheet({ id, date, beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime, achievementRate });
        return updatedSheet;
    }

    static async updateTimeGoal({ id, date, timeGoal }) {
        this.updateTimeGoal.date = ChangeDate.getCurrentDate(date);
        const getSheet = await UserDailySheet.getSheet({ id, date });
        if (!getSheet) {
            const errorMessage = '해당 유저의 데일리 시트를 가져오지 못했습니다.';
            return errorMessage;
        }
        const { studyTimeADay } = getSheet;

        // 목표 달성률 계산
        const timeGoalNum = ChangeDate.toMilliseconds(timeGoal);
        const studyTimeADayNum = ChangeDate.toMilliseconds(studyTimeADay);
        const achievementRate = ((studyTimeADayNum / timeGoalNum) * 100).toFixed(2);

        const updatedGoal = await UserDailySheet.updateTimeGoal({ id, date, timeGoal, achievementRate });

        if (!updatedGoal) {
            const errorMessage = '목표 공부 시간을 업데이트 하지 못했습니다.';
            return errorMessage;
        }

        return updatedGoal;
    }
}

export { UserDailySheetService };
