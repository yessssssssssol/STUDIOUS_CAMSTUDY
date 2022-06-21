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

    static getOneByRoomId({ roomId }) {
        return CommentsModel.findOne({ roomId });
    }

    static delete({ _id }) {
        return CommentsModel.findOneAndDelete({ _id });
    }

    static deleteComments({ roomId }) {
        return CommentsModel.deleteMany({ roomId });
    }

    static changeWithdrawalComments({ id }) {
        const toChangeWithdrawal = { writerId: '탈퇴한 계정', content: '탈퇴한 계정의 댓글은 볼 수 없습니다.' };
        const option = { returnOriginal: false };
        return CommentsModel.updateMany({ writerId: id }, toChangeWithdrawal, option);
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
