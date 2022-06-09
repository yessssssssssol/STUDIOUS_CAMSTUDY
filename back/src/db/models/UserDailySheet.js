import { UserDailySheetModel } from '../schemas/userDailySheet';

class UserDailySheet {
    // 회원가입할 때 최초로 처음 시트를 만들어야 함
    static async addSheet({ id }) {
        const newSheet = {
            id,
            date,
        };
        const addSheet = await UserDailySheetModel.create({});
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
