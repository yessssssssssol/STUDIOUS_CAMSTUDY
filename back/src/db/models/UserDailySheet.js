import { UserDailySheetModel } from '../schemas/userDailySheet';
import dayjs from 'dayjs';

/**
 * 유저 시트 정보
 * @typedef {{_id: string, id: string, date: string, timeGoal: string, achievementRate: number, studyTimeADay: string, bestStudyTime: string, beginStudyTime: string, finishStudyTime: string, createdAt: string}} UserSheetObj
 */

/**
 * 유저 시트 리스트
 * @typedef UserSheetArray
 * @property {UserSheetObj[]} UserSheetArray
 */

class UserDailySheet {
    /**
     * 회원가입할 때 최초로 처음 데일리 시트를 만드는 기능
     * @param {{id: string, date: string}} idAndDate
     * @returns {Promise<UserSheetObj>}
     */
    static addSheet({ id, date }) {
        const now = dayjs();
        const newSheet = {
            id,
            date,
            timeGoal: '아직 목표 공부시간을 설정하지 않았습니다.',
            achievementRate: 0,
            studyTimeADay: ' ',
            bestStudyTime: ' ',
            beginStudyTime: ' ',
            finishStudyTime: ' ',
            createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
        };
        return UserDailySheetModel.create(newSheet);
    }

    /**
     * 오전 5시마다 유저들의 새로운 데일리 시트를 생성
     * @param {array} newSheets
     * @returns {void}
     */
    static addSheets(newSheets) {
        // const addSheets = await UserDailySheetModel.insertMany(newSheets);
        // addSheets.errorMessage = null;
        newSheets.map((newSheet) => {
            UserDailySheetModel.create(newSheet);
            console.log(`${newSheet.id} 데일리 시트 생성 성공! ${new Date()}`);
            return;
        });
        return;
    }

    /**
     * 시트가 이미 만들어져있는지 확인
     * @param {{tody: string}} today
     * @returns {Promise<UserSheetArray>}
     */
    static checkSheetsFromDate({ today }) {
        return UserDailySheetModel.find({ date: today });
    }

    /**
     * 오전 5시 마다 새로운 데일리 시트를 만들기 위해 전날 목표 공부시간을 가져와야함
     * @param {{yesterday: string}} yesterday
     * @returns {Promise<UserSheetArray>}
     */
    static getSheetsFromDate({ yesterday }) {
        return UserDailySheetModel.find({ date: yesterday });
    }

    /**
     * 새로운 로그가 들어올 때마다 데일리 시트를 업데이트하기 위해 금일 데일리 시트 get
     * @param {{id: string, date: string}} idAndDate
     * @returns {Promise<UserSheetObj>}
     */
    static getSheet({ id, date }) {
        return UserDailySheetModel.findOne({ id, date });
    }

    /**
     * 해당 id의 전체 데일리 시트 가져오기
     * @param {{id: string}} id
     * @returns {Promise<UserSheetObj>}
     */
    static getSheets({ id }) {
        return UserDailySheetModel.find({ id });
    }

    /**
     * 해당 id의 전체 데일리 시트 가져오기
     * @param {{id: string, date: string, bestStudyTime: string, finishStudyTime: string, studyTimeADay: string, bestStudyTime: string: achievementRate: number}} updateSheetObj
     * @returns {Promise<UserSheetObj>}
     */
    // 데일리 시트 업데이트 하기
    static updateSheet({
        id,
        date,
        beginStudyTime,
        finishStudyTime,
        studyTimeADay,
        bestStudyTime,
        achievementRate,
    }) {
        const condition = { id, date };
        const update = {
            beginStudyTime,
            finishStudyTime,
            studyTimeADay,
            bestStudyTime,
            achievementRate,
        };
        const option = { returnOriginal: false };

        return UserDailySheetModel.findOneAndUpdate(condition, update, option);
    }

    /**
     * 목표시간 변경
     * @param {{id: string, date: string, timeGoal: string, achievementRate: number}}  updateTimeGoalParams
     * @returns {Promise<UserSheetObj>}
     */
    static async updateTimeGoal({ id, date, timeGoal, achievementRate }) {
        const condition = { id, date };
        const update = { timeGoal, achievementRate };
        const updatedGoal = await UserDailySheetModel.findOneAndUpdate(condition, update, {
            returnOriginal: false,
        });

        return updatedGoal;
    }

    /**
     * 계정 삭제시 유저 시트 같이 삭제
     * @param {{id: string}} id
     * @returns {Promise<UserSheetArray>}
     */
    static deleteUser({ id }) {
        return UserDailySheetModel.deleteMany({ id });
    }
}

export { UserDailySheet };
