import { Comments } from '../db';

class commentsService {
    static create({ newComment }) {
        return Comments.create({ newComment });
    }

    static update({ _id, updateChange }) {
        return Comments.update({ _id, updateChange });
    }

    static getAll({ roomId }) {
        return Comments.getAll({ roomId });
    }

    static getOne({ _id }) {
        return Comments.getOne({ _id });
    }

    static getOneByRoomId({ roomId }) {
        return Comments.getOneByRoomId({ roomId });
    }

    static delete({ _id }) {
        return Comments.delete({ _id });
    }
}

export { commentsService };
