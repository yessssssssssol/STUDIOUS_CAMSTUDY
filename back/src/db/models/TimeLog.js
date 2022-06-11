import { TimeLogModel } from '../schemas/timeLog';

class TimeLog {
    static async create({ newLog }) {
        const createdNewLog = await TimeLogModel.create(newLog);
        return createdNewLog;
    }

    static async findAll({ user_id }) {
        const logs = await TimeLogModel.find({ id: user_id });
        return logs;
    }

    static async findAllADay({ user_id, beginTime, finishTime }) {
        const logsADay = await TimeLogModel.find({
            id: user_id,
            $or: [{ startTimeNum: { $gte: beginTime, $lte: finishTime } }, { endTimeNum: { $gte: beginTime, $lte: finishTime } }],
        });
        return logsADay;
    }

    static deleteUser({ id }) {
        return TimeLogModel.deleteMany({ id });
    }
}

export { TimeLog };
