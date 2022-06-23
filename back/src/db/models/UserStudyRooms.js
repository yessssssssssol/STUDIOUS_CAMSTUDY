import { UserStudyRoomsModel } from '../schemas/userStudyRooms';

class UserStudyRooms {
    static create({ newRoomInfo }) {
        return UserStudyRoomsModel.create(newRoomInfo);
    }

    static update({ roomId, updateChange }) {
        const option = { returnOriginal: false };
        return UserStudyRoomsModel.findOneAndUpdate({ roomId }, updateChange, option);
    }

    static findOne({ roomId }) {
        return UserStudyRoomsModel.findOne({ roomId });
    }

    static findAllMine({ id }) {
        return UserStudyRoomsModel.find({ id });
    }

    static findAllotherMine({ id }) {
        return UserStudyRoomsModel.find({ members: { $in: [id] } });
    }

    static findAll({ group, membersOnly }) {
        return UserStudyRoomsModel.find({ group, membersOnly }).sort({ views: -1 });
    }

    static deleteRoom({ id, roomId }) {
        return UserStudyRoomsModel.findOneAndDelete({ id, roomId });
    }
}

export { UserStudyRooms };
