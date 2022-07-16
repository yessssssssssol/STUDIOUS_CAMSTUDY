import { UserStudyRoomsModel } from '../schemas/userStudyRooms';

class UserStudyRooms {
    /**
     * 개인 스터디룸 생성
     * @param {{newRoomInfo: object}} newRoomInfo
     */
    static create({ newRoomInfo }) {
        return UserStudyRoomsModel.create(newRoomInfo);
    }

    /**
     * 방 정보 수정
     * @param {{roomId: string, updateChange: object}} rommIdAndUpdateChange
     */
    static update({ roomId, updateChange }) {
        const option = { returnOriginal: false };
        return UserStudyRoomsModel.findOneAndUpdate({ roomId }, updateChange, option);
    }

    /**
     * 방 정보 하나 가져오기
     * @param {{roomId: string}} roomId
     */
    static findOne({ roomId }) {
        return UserStudyRoomsModel.findOne({ roomId });
    }

    /**
     * 해당 id가 만든 방들 가져오기
     * @param {{id: string}} id
     */
    static findAllMine({ id }) {
        return UserStudyRoomsModel.find({ id });
    }

    /**
     * 해당 id가 만든 방들 가져오기
     * @param {{id: string}} id
     */
    static findAllotherMine({ id }) {
        return UserStudyRoomsModel.find({ members: { $in: [id] } });
    }

    /**
     * 멤버 || 공개 방 전체 가져오기
     * @param {{group: boolean, membersOnly: boolean}} param0
     * @returns
     */
    static findAll({ group, membersOnly }) {
        return UserStudyRoomsModel.find({ group, membersOnly }).sort({ views: -1 });
    }

    /**
     * 방 삭제
     * @param {{id: string, roomId: string}} param0
     */
    static deleteRoom({ id, roomId }) {
        return UserStudyRoomsModel.findOneAndDelete({ id, roomId });
    }
}

export { UserStudyRooms };
