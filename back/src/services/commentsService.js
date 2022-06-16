import { Comments } from '../db';

class commentsService {
    static create({ newComment }) {
        return Comments.create({ newComment });
    }
}

export { commentsService };
