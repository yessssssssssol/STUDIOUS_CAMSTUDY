import { UserStudyRoomsModel } from '../schemas/userStudyRooms';

class UserStudyRooms {
    static create({ newRoomInfo }) {
        return UserStudyRoomsModel.create(newRoomInfo);
    }

    static update({ roomId, updateChange }) {
        const option = { returnOriginal: false };
        return UserStudyRoomsModel.findOneAndUpdate({ roomId }, updateChange, option);
    }

    static find({ roomId }) {
        return UserStudyRoomsModel.findOne({ roomId });
    }

    static findAllMine({ id }) {
        return UserStudyRoomsModel.find({ id });
    }

    static findAll({ group, membersOnly }) {
        return UserStudyRoomsModel.find({ group, membersOnly }).sort({ views: -1 });
    }

    static deleteRoom({ id, roomId }) {
        return UserStudyRoomsModel.findOneAndDelete({ id, roomId });
    }

    // static findAll({ user_id }) {
    //     return UserStudyRoomsModel.find({ id: user_id });
    // }

    // static findAllADay({ user_id, beginTime, finishTime }) {
    //     return UserStudyRoomsModel.find({
    //         id: user_id,
    //         $or: [{ startTimeNum: { $gte: beginTime, $lte: finishTime } }, { endTimeNum: { $gte: beginTime, $lte: finishTime } }],
    //     });
    // }

    // static deleteUser({ id }) {
    //     return UserStudyRoomsModel.deleteMany({ id });
    // }
}

export { UserStudyRooms };
