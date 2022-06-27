import { TimeLogModel } from '../schemas/timeLog';
import { TotalTimeModel } from '../schemas/totalTime';

class TotalTime {
    //회원가입시 자동 생성
    static create({ id }) {
        return TotalTimeModel.create({ user_id: id });
    }

    static async findAll() {
        return await TotalTimeModel.find();
    }

    static findById({ user_id }) {
        return TotalTimeModel.findOne({ user_id });
    }

    static async updateById({ user_id, toUpdate }) {
        const filter = { user_id };
        const update = { $set: toUpdate };
        const option = { returnOriginal: false };

        return await TotalTimeModel.findOneAndUpdate(filter, update, option);
    }

    static async rankingBoard({}) {
        const aggregatorOpts = [
            {
                $sort: { totalTime: -1 },
            },
        ];

        return await TotalTimeModel.aggregate(aggregatorOpts).limit(10).exec();
    }

    static async deleteUser({ id }) {
        const user_id = id;
        return await TotalTimeModel.findOneAndDelete({ user_id });
    }
}

export { TotalTime };
