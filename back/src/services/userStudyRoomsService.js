import { Comments, UserStudyRooms } from '../db';

class userStudyRoomsService {
    static createRoom({ newRoomInfo }) {
        return UserStudyRooms.create({ newRoomInfo });
    }

    static updateRoom({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }

    static getRoom({ roomId }) {
        return UserStudyRooms.find({ roomId });
    }

    static getRooms({ id }) {
        return UserStudyRooms.findAllMine({ id });
    }

    static getOpenRooms({ group, membersOnly }) {
        return UserStudyRooms.findAll({ group, membersOnly });
    }

    static delRoom({ id, roomId }) {
        return Promise.all([UserStudyRooms.deleteRoom({ id, roomId }), Comments.deleteComments({ roomId })]);
    }

    static addMember({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }

    static delMember({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }
}

export { userStudyRoomsService };
