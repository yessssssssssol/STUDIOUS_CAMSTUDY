import { CommentsModel } from '../schemas/comments';

class Comments {
    static create({ newComment }) {
        return CommentsModel.create(newComment);
    }

    static update({ _id, updateChange }) {
        const option = { returnOriginal: false };
        return CommentsModel.findOneAndUpdate({ _id }, updateChange, option);
    }

    static getAll({ roomId }) {
        return CommentsModel.find({ roomId });
    }

    static getOne({ _id }) {
        return CommentsModel.findById({ _id });
    }

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
