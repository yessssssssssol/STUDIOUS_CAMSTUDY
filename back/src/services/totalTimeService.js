import { UserDailySheet } from '../db';
import { TotalTime } from '../db/models/TotalTime';
import { analyzeDate } from '../utils/analyzeDate';

class TotalTimeService {
    static async update({ user_id }) {
        // const totalTime = await TotalTime.findById({ user_id });
        const getSheets = await UserDailySheet.getSheets({ id: user_id });
        console.log(getSheets);

        const total = analyzeDate.avgAndSum(getSheets);
        const totalTime = total.time;
        console.log('totalTime', totalTime);
        const toUpdate = { totalTime };
        console.log(toUpdate);
        console.log(user_id);

        const updatedTotalTime = await TotalTime.updateById({ user_id, toUpdate });
        if (!updatedTotalTime) {
            return { errorMessage: '업데이트 실패' };
        }
        return updatedTotalTime;
    }

    static async getAll() {
        return await TotalTime.findAll();
    }

    static async getRanking({}) {
        return await TotalTime.rankingBoard({});
    }
}

export { TotalTimeService };
