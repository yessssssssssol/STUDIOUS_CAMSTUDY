import { Applicants } from '../db';

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
 *  스터디 신청 관련 기능
 */
class applicantsService {
    /**
     * 스터디 신청(applicants collection에 해당 data추가)
     * @param {ApplicationObj} ApplicationObj
     */
    static create({ application }) {
        return Applicants.create({ application });
    }
    /**
     * 신청 중복체크
     * @param {IDandRoomID} IDandRoomID - 중복체크시 필요한 인자들
     */
    static checkOverlapping({ applicantId, roomId }) {
        return Applicants.checkOverlapping({ applicantId, roomId });
    }

    /**
     * 해당하는 스터디룸 신청자 리스트 가져오기
     * @param {string} roomId - 방 아이디
     */
    static getLists({ roomId }) {
        return Applicants.getLists({ roomId });
    }

    /**
     * applicant collection에서 해당하는 document 삭제
     * @param {IDandRoomID} IDandRoomID - 중복체크시 필요한 인자들
     */
    static delete({ applicantId, roomId }) {
        return Applicants.delete({ applicantId, roomId });
    }

    /**
     * room 삭제시 신청한 사용자들 리스트도 같이 삭제
     * @param {string} roomId - 방 아이디
     *
     */
    static deleteApplicants({ roomId }) {
        return Applicants.deleteMany({ roomId });
    }
}

export { applicantsService };
