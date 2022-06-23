import { UserDailySheet } from '../db';
import { TotalTime } from '../db/models/TotalTime';
import { analyzeDate } from '../utils/analyzeDate';

class TotalTimeService {
    static async update({ user_id }) {
        const totalTime = await TotalTime.findById({ user_id });
        const getSheets = await UserDailySheet.getSheets({ id: user_id });

        const total = analyzeDate.avgAndSum(getSheets);
        const updatedTime = total.time;

        // const newTotalTime = await TotalTime.updateById({ user_id, updatedTime });
        totalTime.totalTime.set(updatedTime);
        await totalTime.save();
        console.log(totalTime);
        if (!totalTime) {
            return { errorMessage: '업데이트 실패' };
        }
    }

    static async getAll() {
        return await TotalTime.findAll();
    }

    static async getRangking({}) {
        return await TotalTime.rankingBoard({});
    }
}

export { TotalTimeService };
