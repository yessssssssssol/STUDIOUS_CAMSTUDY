import { ApplicantsModel } from '../schemas/aplicants';

class Applicants {
    static create({ application }) {
        return ApplicantsModel.create(application);
    }

    static checkOverlapping({ roomId }) {
        return ApplicantsModel.findOne({ roomId });
    }

    // static create({ newLog }) {
    //     return TimeLogModel.create(newLog);
    // }
    // staticfindAll({ user_id }) {
    //     return TimeLogModel.find({ id: user_id });
    // }
    // static findAllADay({ user_id, beginTime, finishTime }) {
    //     return TimeLogModel.find({
    //         id: user_id,
    //         $or: [{ startTimeNum: { $gte: beginTime, $lte: finishTime } }, { endTimeNum: { $gte: beginTime, $lte: finishTime } }],
    //     });
    // }
    // static deleteUser({ id }) {
    //     return TimeLogModel.deleteMany({ id });
    // }
}

export { Applicants };
