import { UserStudyRooms } from '../db';

class userStudyRoomsService {
    static createRoom({ newRoomInfo }) {
        console.log('service단');
        return UserStudyRooms.create({ newRoomInfo });
    }

    static updateRoom({ roomId, updateChange }) {
        return UserStudyRooms.update({ roomId, updateChange });
    }

    static getRoom({ roomId }) {
        return UserStudyRooms.get({ roomId });
    }
}

export { userStudyRoomsService };
