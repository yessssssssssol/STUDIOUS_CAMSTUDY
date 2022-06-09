import { UserDailySheetModel } from '../schemas/userDailySheet';

class UserDailySheet {
    // 회원가입할 때 최초로 처음 시트를 만들어야 함
    static async addSheet({ id, idx }) {}

    static async addSheets({ newSheets }) {
        const addSheets = await UserDailySheetModel.insertMany({ newSheets });
        addSheets.errorMessage = null;

        return addSheets;
    }

    // 5시 마다 새로운 시트를 만들기 위해 전날 목표 공부시간을 가져와야함
    // 각 유저의 가장 최신 시트를 가져와야 하는데 어떻게 하는건지 모르겟음
    // 날짜로 가져오자
    static async getSheets({ yesterday }) {
        const getSheets = await UserDailySheetModel.find({ date: yesterday });
        return getSheets;
    }
}

export { UserDailySheet };
