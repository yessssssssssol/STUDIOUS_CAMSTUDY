import { CommentsModel } from '../schemas/userStudyRooms';

class Comments {
    static create({ newRoomInfo }) {
        return CommentsModel.create(newRoomInfo);
    }

    static update({ roomId, updateChange }) {
        const option = { returnOriginal: false };
        return CommentsModel.findOneAndUpdate({ roomId }, updateChange, option);
    }

    static find({ roomId }) {
        return CommentsModel.findOne({ roomId });
    }

    static findAllMine({ id }) {
        return CommentsModel.find({ id });
    }

    static findAll({ group, membersOnly }) {
        return CommentsModel.find({ group, membersOnly }).sort({ views: -1 });
    }

    static deleteRoom({ id, roomId }) {
        return CommentsModel.findOneAndDelete({ id, roomId });
    }
}

export { Comments };
