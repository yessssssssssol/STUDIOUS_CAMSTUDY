import { Comments } from '../db';

class commentsService {
    static create({ newComment }) {
        return Comments.create({ newComment });
    }

    static getAll({ roomId }) {
        return Comments.getAll({ roomId });
    }
}

export { commentsService };
