import { UserDailySheetModel } from '../schemas/userDailySheet';

class UserDailySheet {
    // 회원가입할 때 최초로 처음 데일리 시트를 만들어야 함
    static async addSheet({ id, date }) {
        const newSheet = {
            id,
            date,
            timeGoal: '아직 목표 공부시간을 설정하지 않았습니다.',
            achievementRate: 0,
            studyTimeADay: ' ',
            bestStudyTime: ' ',
            beginStudyTime: ' ',
            finishStudyTime: ' ',
        };
        const addSheet = await UserDailySheetModel.create(newSheet);
        return addSheet;
    }
    // 오전 5시마다 유저들의 새로운 데일리 시트를 생성
    static async addSheets(newSheets) {
        // const addSheets = await UserDailySheetModel.insertMany(newSheets);
        // addSheets.errorMessage = null;
        newSheets.map(async (newSheet) => {
            await UserDailySheetModel.create(newSheet);
            console.log(`${newSheet.id} 데일리 시트 생성 성공! ${new Date()}`);
            return;
        });
        return;
    }

    // 오전 5시 마다 새로운 데일리 시트를 만들기 위해 전날 목표 공부시간을 가져와야함
    static async getSheetsFromDate({ yesterday }) {
        console.log(yesterday);
        const getSheets = await UserDailySheetModel.find({ date: yesterday });
        return getSheets;
    }

    // 새로운 로그가 들어올 때마다 데일리 시트를 업데이트하기 위해 금일 데일리 시트 get
    static async getSheet({ id, date }) {
        const getSheet = UserDailySheetModel.findOne({ id, date });
        return getSheet;
    }

    // 해당 id의 전체 데일리 시트 가져오기
    static async getSheets({ id }) {
        const getSheets = UserDailySheetModel.find({ id });
        return getSheets;
    }

    // 데일리 시트 업데이트 하기
    static async updateSheet({ id, date, beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime, achievementRate }) {
        const condition = { id, date };
        const update = { beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime, achievementRate };
        const option = { returnOriginal: false };

        const updatedSheet = await UserDailySheetModel.findOneAndUpdate(condition, update, option);
        return updatedSheet;
    }

    static async updateTimeGoal({ id, date, timeGoal, achievementRate }) {
        const condition = { id, date };
        const update = { timeGoal, achievementRate };
        const updatedGoal = await UserDailySheetModel.findOneAndUpdate(condition, update, { returnOriginal: false });

        return updatedGoal;
    }

    static deleteUser({ id }) {
        return UserDailySheetModel.deleteMany({ id });
    }
}

export { UserDailySheet };
