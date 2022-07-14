import { CommentsModel } from '../schemas/comments';

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
 * 댓글 정보
 * @typedef {{writerId: string, roomId: string, content: string, createdAt: string, updatedAt: string, _id: string:, __v: number}} CommentObject
 */

/**
 * 댓글 리스트
 * @typedef CommentsArray
 * @property {CommentsArray[]} CommentsArray
 */

class Comments {
    /**
     * 댓글 작성
     * @param {NewCommentObj} CommentObj
     * @returns {Promise<CommentObject>}
     */
    static create({ newComment }) {
        return CommentsModel.create(newComment);
    }

    /**
     * 댓글 변경
     * @param {updateCommentObj} updateCommentObj
     * @returns {Promise<CommentObject>}
     */
    static update({ _id, updateChange }) {
        const option = { returnOriginal: false };
        return CommentsModel.findOneAndUpdate({ _id }, updateChange, option);
    }

    /**
     * 방에 있는 댓글 리스트 다 가져오기
     * @param {{roomId: string}} roomId - 방 아아디
     * @returns {Promise<CommentsArray>}
     */
    static getAll({ roomId }) {
        return CommentsModel.find({ roomId });
    }

    /**
     * 댓글 하나 가져오기
     * @param {{_id: string}} _id - 댓글 고유 아이디
     * @returns {Promise<CommentObject>}
     */
    static getOne({ _id }) {
        return CommentsModel.findById({ _id });
    }

    // static getOneByRoomId({ roomId }) {
    //     return CommentsModel.findOne({ roomId });
    // }

    /**
     * 댓글 삭제
     * @param {{_id: string}} _id - 댓글 고유 아이디
     * @returns {Promise<CommentObject>}
     */
    static delete({ _id }) {
        return CommentsModel.findOneAndDelete({ _id });
    }

    /**
     * 스터디룸에 있는 댓글 모두 삭제
     * @param {{roomId: string} roomId 방 아이디
     * @returns {Promise<CommentsArray>}
     */
    static deleteComments({ roomId }) {
        return CommentsModel.deleteMany({ roomId });
    }

    /**
     * 탈퇴한 계정 탈퇴한 계정이라고 정보 바꾸기
     * @param {{id: string}} id - 유저 아아디
     * @returns {Promise<CommentsArray>}
     */
    static changeWithdrawalComments({ id }) {
        const toChangeWithdrawal = {
            writerId: '탈퇴한 계정',
            content: '탈퇴한 계정의 댓글은 볼 수 없습니다.',
        };
        const option = { returnOriginal: false };
        return CommentsModel.updateMany({ writerId: id }, toChangeWithdrawal, option);
    }
}

export { Comments };
