import { ApplicantsModel } from '../schemas/aplicants';

/**
 * 비공개(멤버온니) 스터디룸 신청시 필요한 정보들
 * @typedef {object} ApplicationObj - 신청시 필요한 정보들
 * @property {object} ApplicationObj.application - 신청시 필요한 정보들 (roomId, applicantId, createdAt)
 * @property {string} ApplicationObj.application.roomId - 방 아이디
 * @property {string} ApplicationObj.application.applicantId - 스터디 신청자 아이디
 * @property {string} ApplicationObj.application.createdAt - 생성한 시각
 */

/**
 * 신청한 사람id와 신청받은 roomId 정보
 * @typedef {{applicantId: string, roomId: string}} IDandRoomID - 필요한 정보(applicationId, roomId)
 */

/**
 * 스터디 신청자 정보
 * @typedef {{roomId: string, appicantId: string, status: boolean, createdAt: string, _id: string, __v: number}} ApplicantsObject
 */

/**
 * 스터디 신청자 정보 리스트
 * @typedef ApplicantsArray
 * @property {ApplicantsObject[]} ApplicantsArray
 */

class Applicants {
    /**
     * 스터디 신청
     * @param {ApplicationObj} ApplicationObj
     * @return {Promise<ApplicantsObject>}
     */
    static create({ application }) {
        return ApplicantsModel.create(application);
    }

    /**
     * 신청 중복체크
     * @param {IDandRoomID} IDandRoomID - 중복체크시 필요한 인자들
     * @return {Promise<ApplicantsObject>}
     */
    static checkOverlapping({ applicantId, roomId }) {
        return ApplicantsModel.findOne({ applicantId, roomId });
    }

    /**
     * applicant collection에서 해당하는 document 삭제
     * @param {IDandRoomID} IDandRoomID - 중복체크시 필요한 인자들
     * @return {Promise<ApplicantsObject>}
     */
    static delete({ applicantId, roomId }) {
        return ApplicantsModel.findOneAndDelete({ applicantId, roomId });
    }

    /**
     * room 삭제시 신청한 사용자들 리스트도 같이 삭제
     * @param {{roomId: string}} roomId - 방 아이디
     * @return {Promise<ApplicantsArray>}
     */
    static deleteMany({ roomId }) {
        return ApplicantsModel.deleteMany({ roomId });
    }

    /**
     * 계정 삭제시 해당 계정이 스터디룸 신청한 리스트도 같이 삭제
     * @param {{id: string}} id - 유저 고유 아이디
     * @return {Promise<ApplicantsArray>}
     */
    static deleteManyById({ id }) {
        return ApplicantsModel.deleteMany({ id });
    }

    /**
     * 해당하는 스터디룸 신청자 리스트 가져오기
     * @param {{roomId: string}} roomId - 방 아이디
     * @return {Promise<ApplicantsArray>}
     */
    static getLists({ roomId }) {
        return ApplicantsModel.find({ roomId });
    }
}

export { Applicants };
