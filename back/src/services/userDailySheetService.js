import { User, UserDailySheet } from '../db';
import dayjs from 'dayjs';

class UserDailySheetService {
    // 5시 마다 새로운 시트 만들기
    static async newUserDailySheet() {
        // 날짜 가져오기
        const now = dayjs();
        const today = now.format('YYYY-MM-DD');
        const yesterday = now.add(-1, 'day').format().slice(0, 10);
        // 유저 시트에 있는 최근 목표 공부 시간을 가져와서 배열로 만들어야 함
        const userSheets = await UserDailySheet.getSheets({ yesterday });
        if (userSheets === []) {
            const errorMessage = '새로 시트를 만들 때 필요한 전날 시트 데이터가 없습니다.';
            return { errorMessage };
        }
        const newSheets = userSheets.map((sheet) => {
            const { id, timeGoal } = sheet;
            return {
                id,
                date: today,
                timeGoal,
                studyTimeADay: '',
                bestStudyTime: '',
                beginStudyTime: '',
                finishStudyTime: '',
            };
        });

        await UserDailySheet.addSheets({ newSheets });
        return '사용자 시트가 성공적으로 업데이트 됐습니다.';
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
