import { CommentsModel } from '../schemas/comments';

class Comments {
    static create({ newComment }) {
        return CommentsModel.create(newComment);
    }

    static getAll({ roomId }) {
        return CommentsModel.find({ roomId });
    }

    // static update({ roomId, updateChange }) {
    //     const option = { returnOriginal: false };
    //     return CommentsModel.findOneAndUpdate({ roomId }, updateChange, option);
    // }

    // static find({ roomId }) {
    //     return CommentsModel.findOne({ roomId });
    // }

    // static findAllMine({ id }) {
    //     return CommentsModel.find({ id });
    // }

    // static findAll({ group, membersOnly }) {
    //     return CommentsModel.find({ group, membersOnly }).sort({ views: -1 });
    // }

    // static deleteRoom({ id, roomId }) {
    //     return CommentsModel.findOneAndDelete({ id, roomId });
    // }
}

export { Comments };
