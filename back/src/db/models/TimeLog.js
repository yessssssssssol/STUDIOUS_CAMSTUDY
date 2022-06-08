import { TimeLogModel } from '../schemas/timeLog';
// 현재 시간 1654978416864
// const now = Date.now();
// const year = new Date(now).getFullYear();
// const month = new Date(now).getMonth() + 1;
// const date = new Date(now).getDate();

// console.log(year, month, date);

// const beginTime = new Date(`${year}/${month}/${date}/${5}:${0}`).getTime();
// const finishTime = beginTime + 86400000;
// console.log(now);
// console.log(beginTime, finishTime);
// console.log(new Date(beginTime), new Date(finishTime));

// const beginTime = new Date(now).toISOString()

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
}

export { TimeLog };
