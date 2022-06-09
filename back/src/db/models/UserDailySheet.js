import { UserDailySheetModel } from '../schemas/userDailySheet';

class UserDailySheet {
    // 회원가입할 때 최초로 처음 시트를 만들어야 함
    static async addSheet({ id, date }) {
        const newSheet = {
            id,
            date,
            timeGoal: 0,
            studyTimeADay: '',
            bestStudyTime: '',
            beginStudyTime: '',
            finishStudyTime: '',
        };
        const addSheet = await UserDailySheetModel.create({ newSheet });
        return addSheet;
    }

    static async addSheets({ newSheets }) {
        const addSheets = await UserDailySheetModel.insertMany({ newSheets });
        addSheets.errorMessage = null;

        return addSheets;
    }

    // 5시 마다 새로운 시트를 만들기 위해 전날 목표 공부시간을 가져와야함
    static async getSheets({ yesterday }) {
        const getSheets = await UserDailySheetModel.find({ date: yesterday });
        return getSheets;
    }
}

export { UserDailySheet };
