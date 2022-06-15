import { UserStudyRooms } from '../db';

class userStudyRoomsService {
    static createRoom({ newRoomInfo }) {
        console.log('service단');
        return UserStudyRooms.create({ newRoomInfo });
    }

    static updateRoom({ roomId, updateChange }) {
        console.log('service단', roomId, updateChange);
        return UserStudyRooms.update({ roomId, updateChange });
    }
}

export { userStudyRoomsService };
