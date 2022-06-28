import { ApplicantsModel } from '../schemas/aplicants';

class Applicants {
    static create({ application }) {
        return ApplicantsModel.create(application);
    }

    static checkOverlapping({ applicantId, roomId }) {
        return ApplicantsModel.findOne({ applicantId, roomId });
    }

    static delete({ applicantId, roomId }) {
        return ApplicantsModel.findOneAndDelete({ applicantId, roomId });
    }

    static deleteMany({ roomId }) {
        return ApplicantsModel.deleteMany({ roomId });
    }

    static deleteManyById({ id }) {
        return ApplicantsModel.deleteMany({ id });
    }

    static getLists({ roomId }) {
        return ApplicantsModel.find({ roomId });
    }

    // static changeStatus({ applicantId, roomId, updateThing }) {
    //     const option = { returnOriginal: false };
    //     return ApplicantsModel.findOneAndUpdate({ applicantId, roomId }, updateThing, option);
    // }

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
