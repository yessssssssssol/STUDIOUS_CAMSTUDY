import { TimeLogModel } from '../schemas/timeLog';

/**
 * 타임로그 생성시 필요한 인자들
 * @typedef {object} NewtimeLogObj
 * @property {object} timeLogObj.newLog - 타임로그 생성시 필요한 것들(user_id, startTime, endTime)
 * @property {string} timeLogObj.newLog.user_id - 유저 아이디
 * @property {string} timeLogObj.newLog.startTime - 공부 시작한 시간
 * @property {string} timeLogObj.newLog.endTime - 공부 마친 시간
 */

/**
 * @typedef {{id: string, startTime: string, endTime: string, startTimeNum: number, endTimeNum: number, studyTimeNum: number, studyTimeStr: string, _id: string, __v: number}} timeLogObj
 */

/**
 * 댓글 리스트
 * @typedef TimeLogArray
 * @property {NewtimeLogObj[]} TimeLogArray
 */

class TimeLog {
    /**
     * 타임로그 생성
     * @param {NewtimeLogObj} NewtimeLogObj
     * @returns {Promise<timeLogObj>}
     */
    static create({ newLog }) {
        return TimeLogModel.create(newLog);
    }

    // static findAll({ user_id }) {
    //     return TimeLogModel.find({ id: user_id });
    // }

    /**
     * 타임로그 리스트 불러오기 (하루치)
     * @param {{user_id: string, beginTime: string, finishTime: string}} IdBeginAndFinish - (user_id, beginTime, finishTime)
     * @returns {Promise<TimeLogArray>}
     */
    static findAllADay({ user_id, beginTime, finishTime }) {
        return TimeLogModel.find({
            id: user_id,
            $or: [
                { startTimeNum: { $gte: beginTime, $lte: finishTime } },
                { endTimeNum: { $gte: beginTime, $lte: finishTime } },
            ],
        });
    }

    /**
     * 회원탈퇴 시 타임로그 삭제
     * @param {{id: string}} id - 유저 아이디
     * @returns {Promise<TimeLogArray>}
     */
    static deleteUser({ id }) {
        return TimeLogModel.deleteMany({ id });
    }
}

export { TimeLog };
