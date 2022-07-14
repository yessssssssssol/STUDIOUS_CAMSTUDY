import { Comments } from '../db';

/**
 * 댓글 작성시 필요한 정보들 필요한 정보들
 * @typedef {object} NewCommentObj - 댓글 작성시 필요한 정보들
 * @property {object} NewCommentObj.newComment - 신청시 필요한 정보들 (writerId, roomId, createdAt, updatedAt)
 * @property {string} NewCommentObj.newComment.writerId - 방 아이디
 * @property {string} NewCommentObj.newComment.roomId - 스터디 신청자 아이디
 * @property {string} NewCommentObj.newComment.createdAt - 생성한 시각
 * @property {string} NewCommentObj.newComment.updatedAt - 업데이트한 시각
 */

/**
 * 댓글 업데이트시 필요한 정보들 필요한 정보들
 * @typedef {object} updateCommentObj - 댓글 작성시 필요한 정보들
 * @property {string} updateCommentObj._id - 댓글 고유 아이디
 * @property {object} updateCommentObj.updateChange - 변경되는 것들(content, updatedAt)
 * @property {string} updateCommentObj.updateChange.content - 변경된 댓글 내용
 * @property {string} updateCommentObj.updateChange.updatedAt - 변경한 시각
 */

/**
 *  댓글 관련 기능
 */
class commentsService {
    /**
     * 댓글 작성
     * @param {NewCommentObj} CommentObj
     */
    static create({ newComment }) {
        return Comments.create({ newComment });
    }

    /**
     * 댓글 변경
     * @param {updateCommentObj} updateCommentObj
     */
    static update({ _id, updateChange }) {
        return Comments.update({ _id, updateChange });
    }

    /**
     * 방에 있는 댓글 리스트 다 가져오기
     * @param {{roomId: string}} roomId - 방 아아디
     */
    static getAll({ roomId }) {
        return Comments.getAll({ roomId });
    }

    /**
     * 댓글 하나 가져오기
     * @param {{_id: string}} _id - 댓글 고유 아이디
     */
    static getOne({ _id }) {
        return Comments.getOne({ _id });
    }

    // static getOneByRoomId({ roomId }) {
    //     return Comments.getOneByRoomId({ roomId });
    // }

    /**
     * 댓글 삭제
     * @param {{_id: string}} _id - 댓글 고유 아이디
     */
    static delete({ _id }) {
        return Comments.delete({ _id });
    }
}

export { commentsService };
