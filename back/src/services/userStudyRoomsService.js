import { Comments, UserStudyRooms } from '../db';
import { applicantsService } from './applicantsService';
import { v4 as uuid } from 'uuid';
import { ChangeDate } from '../utils/changeDate';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

class userStudyRoomsService {
    /**
     * 개인룸 생성
     * @param {{id: string}} id
     */
    static createPrivateRoom({ id }) {
        dayjs.locale('ko');
        const now = dayjs();
        const startStudyDay = ChangeDate.getCurrentDate();

        const newRoomInfo = {
            id,
            roomId: uuid().replace(/-/g, ''),
            roomImg: '사진 정보가 없습니다.',
            roomName: '개인 스터디룸 이름을 설정해주세요.',
            group: false,
            startStudyDay,
            endStudyDay: ' ',
            focusTimeStart: ' ',
            focusTimeEnd: ' ',
            createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: now.format('YYYY-MM-DD HH:mm:ss'),
        };

        return UserStudyRooms.create({ newRoomInfo });
    }

    /**
     *
     * @param {{newRoomInfo: object}} newRoomInfo
     */
    static createRoom({ newRoomInfo }) {
        return UserStudyRooms.create({ newRoomInfo });
    }

    /**
     * 방 정보 수정
     * @param {{roomId: string, updateChange: object}} rommIdAndUpdateChange
     */
    static updateRoom({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }

    /**
     * 방 정보 하나 가져오기
     * @param {{roomId: string}} roomId
     */
    static getRoom({ roomId }) {
        return UserStudyRooms.findOne({ roomId });
    }

    /**
     * 해당 id가 만든 방들 가져오기
     * @param {{id: string}} id
     */
    static getRooms({ id }) {
        return UserStudyRooms.findAllMine({ id });
    }

    /**
     * 해당 id가 만든 방들 가져오기
     * @param {{id: string}} id
     */
    static getOtherRooms({ id }) {
        return UserStudyRooms.findAllotherMine({ id });
    }

    /**
     * 멤버 || 공개 방 전체 가져오기
     * @param {{group: boolean, membersOnly: boolean}} param0
     */
    static getOpenRooms({ group, membersOnly }) {
        return UserStudyRooms.findAll({ group, membersOnly });
    }

    /**
     * 방 삭제
     * @param {{id: string, roomId: string}} param0
     */
    static delRoom({ id, roomId }) {
        return Promise.all([
            UserStudyRooms.deleteRoom({ id, roomId }),
            Comments.deleteComments({ roomId }),
            applicantsService.deleteApplicants({ roomId }),
        ]);
    }

    /**
     * 스터디 신청자 멤버로 추가
     * @param {{roomId: string, updateChange: object}} rommIdAndUpdateChange
     */
    static addMember({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }

    /**
     * 멤버 제거
     * @param {{roomId: string, updateChange: object}} rommIdAndUpdateChange
     */
    static delMember({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }
}

export { userStudyRoomsService };
