import { UserDailySheetModel } from '../schemas/userDailySheet';

class UserDailySheet {
    // 회원가입할 때 최초로 처음 데일리 시트를 만들어야 함
    static async addSheet({ id, date }) {
        const newSheet = {
            id,
            date,
            timeGoal: '아직 목표 공부시간을 설정하지 않았습니다.',
            studyTimeADay: ' ',
            bestStudyTime: ' ',
            beginStudyTime: ' ',
            finishStudyTime: ' ',
        };
        const addSheet = await UserDailySheetModel.create(newSheet);
        return addSheet;
    }
    // 오전 5시마다 유저들의 새로운 데일리 시트를 생성
    static async addSheets({ newSheets }) {
        const addSheets = await UserDailySheetModel.insertMany({ newSheets });
        addSheets.errorMessage = null;

        return addSheets;
    }

    // 오전 5시 마다 새로운 데일리 시트를 만들기 위해 전날 목표 공부시간을 가져와야함
    static async getSheets({ yesterday }) {
        const getSheets = await UserDailySheetModel.find({ date: yesterday });
        return getSheets;
    }

    // 새로운 로그가 들어올 때마다 데일리 시트를 업데이트하기 위해 금일 데일리 시트 get
    static async getSheet({ id, date }) {
        const getSheet = UserDailySheetModel.findOne({ id, date });
        return getSheet;
    }

    // 데일리 시트 업데이트 하기
    static async updateSheet({ id, beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime }) {
        const update = { beginStudyTime, finishStudyTime, studyTimeADay, bestStudyTime };
        const option = { returnOriginal: false };

        const updatedSheet = await UserDailySheetModel.findOneAndUpdate(id, update, option);
        return updatedSheet;
    }
}

export { UserDailySheet };
