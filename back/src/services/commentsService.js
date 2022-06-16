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

    static delete({ _id }) {
        return Comments.delete({ _id });
    }

    static deleteComments({ roomId }) {
        return Comments.deleteComments({ roomId });
    }
}

export { commentsService };
