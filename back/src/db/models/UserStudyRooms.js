import { UserStudyRoomsModel } from '../schemas/userStudyRooms';

class UserStudyRooms {
    static create({ newRoomInfo }) {
        return UserStudyRoomsModel.create(newRoomInfo);
    }

    staticfindAll({ user_id }) {
        return UserStudyRoomsModel.find({ id: user_id });
    }

    static findAllADay({ user_id, beginTime, finishTime }) {
        return UserStudyRoomsModel.find({
            id: user_id,
            $or: [{ startTimeNum: { $gte: beginTime, $lte: finishTime } }, { endTimeNum: { $gte: beginTime, $lte: finishTime } }],
        });
    }

    static deleteUser({ id }) {
        return UserStudyRoomsModel.deleteMany({ id });
    }
}

export { UserStudyRooms };
