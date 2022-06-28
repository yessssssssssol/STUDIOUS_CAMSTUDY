import { Comments, UserStudyRooms } from '../db';
import { applicantsService } from './applicantsService';
import { v4 as uuid } from 'uuid';
import { ChangeDate } from '../utils/changeDate';
import dayjs from 'dayjs';

class userStudyRoomsService {
    static createPrivateRoom({ id }) {
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

    static createRoom({ newRoomInfo }) {
        return UserStudyRooms.create({ newRoomInfo });
    }

    static updateRoom({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }

    static getRoom({ roomId }) {
        return UserStudyRooms.findOne({ roomId });
    }

    static getRooms({ id }) {
        return UserStudyRooms.findAllMine({ id });
    }

    static getOtherRooms({ id }) {
        return UserStudyRooms.findAllotherMine({ id });
    }

    static getOpenRooms({ group, membersOnly }) {
        return UserStudyRooms.findAll({ group, membersOnly });
    }

    static delRoom({ id, roomId }) {
        return Promise.all([
            UserStudyRooms.deleteRoom({ id, roomId }),
            Comments.deleteComments({ roomId }),
            applicantsService.deleteApplicants({ roomId }),
        ]);
    }

    static addMember({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }

    static delMember({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }
}

export { userStudyRoomsService };
