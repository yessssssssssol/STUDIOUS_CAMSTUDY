import { UserStudyRooms } from '../db';

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
}

export { userStudyRoomsService };
