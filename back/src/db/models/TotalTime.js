import { TotalTimeModel } from '../schemas/totalTime';

class TotalTime {
    //회원가입시 자동 생성
    static create({ id }) {
        return TotalTimeModel.create({ user_id: id });
    }

    static async findAll() {
        console.log('modelhi');
        return await TotalTimeModel.find();
    }

    static findById({ user_id }) {
        return TotalTimeModel.findOne({ user_id });
    }

    static async updateById({ user_id, updatedTime: totalTime }) {
        const option = { returnOriginal: false };

        return await TotalTimeModel.findOneAndUpdate(user_id, totalTime, option);
    }

    // 랭킹보드 쿼리로 조회
    // 성능 문제가 생기면 user_id : count 형식으로 데이터를 따로 저장하고 count에 index를 설정해서 자동 정렬되게끔 설정
    static async rankingBoard({}) {
        const aggregatorOpts = [
            {
                $group: {
                    _id: '$user_id',
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
        ];

        return await TotalTimeModel.aggregate(aggregatorOpts).limit(5).exec();
    }
}

export { TotalTime };
