import { Applicants, Comments, TimeLog, User, UserDailySheet, UserStudyRooms } from '../db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { gcsBucket } from '../utils/multer';
import { ChangeDate } from '../utils/changeDate';
import sendMail from '../utils/sendMail';
import { userStudyRoomsService } from './userStudyRoomsService';
import { TotalTime } from '../db/models/TotalTime';

/**
 * 업데이트시 필요한 인자
 * @typedef {object} UpdateUserObj
 * @property {string} UpdateUserObj.user_id - 유저 아이디
 * @property {object} UpdateUserObj.toUpdate - 업데이트할 항목
 * @property {string} UpdateUserObj.toUpdate.updatedAt - 업데이트 시각
 * @property {string} [UpdateUserObj.toUpdate.name] - 이름
 * @property {string} [UpdateUserObj.toUpdate.email] -  이메일
 * @property {string} [UpdateUserObj.toUpdate.password] - 비밀번호
 * @property {string} [UpdateUserObj.toUpdate.description] - 설명
 */

class userAuthService {
    /**
     * 새로운 유저 생성
     * @param {{name: string, email: string, password: string}} NewUserObj
     */
    static async addUser({ name, email, password }) {
        // 이메일 중복 확인
        const user = await User.findByEmail({ email });
        if (user) {
            const errorMessage = '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
            return { errorMessage };
        }
        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(password, 10);

        //날짜 생성
        dayjs.locale('ko');
        const now = dayjs();
        const createdAt = now.format('YYYY-MM-DD HH:mm:ss');
        const updatedAt = now.format('YYYY-MM-DD HH:mm:ss');
        const date = ChangeDate.getCurrentDate();

        // id 는 유니크 값 부여
        const id = uuidv4();
        const newUser = { id, name, email, password: hashedPassword, createdAt, updatedAt };

        let resultPromise = undefined;
        await Promise.all([
            User.create({ newUser }),
            TotalTime.create({ id }),
            UserDailySheet.addSheet({ id, date }),
            userStudyRoomsService.createPrivateRoom({ id }),
        ]).then((result) => (resultPromise = result));
        // createdNewUserSheet.errorMessage = null;
        // createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
        // console.log(`${id}의 sheet가 성공적으로 생성되었습니다.`);

        if (!resultPromise === undefined)
            return res
                .status(500)
                .json({ message: '회원가입이 정상적으로 이루어지지 않았습니다.' });

        const registerResult = resultPromise[0].toObject();
        delete registerResult.password;

        return registerResult;
    }

    /**
     * 로그인
     * @param {{email: string, password: string}} login
     */
    static async getUser({ email, password }) {
        // 이메일 db에 존재 여부 확인
        const user = await User.findByEmail({ email });
        if (!user) {
            const errorMessage = '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        // 비밀번호 일치 여부 확인
        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
        if (!isPasswordCorrect) {
            const errorMessage = '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        // 로그인 성공 -> JWT 웹 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
        // console.log(secretKey);
        const token = jwt.sign({ user_id: user.id }, secretKey);

        // 반환할 loginuser 객체를 위한 변수 설정
        const id = user.id;
        const name = user.name;
        const description = user.description;
        const profileUrl = user.profileUrl;

        const loginUser = {
            token,
            id,
            email,
            name,
            description,
            profileUrl,
            errorMessage: null,
        };

        return loginUser;
    }

    static async getUsers() {
        const users = User.findAll();
        return users;
    }

    /**
     * 유저 정보 변경
     * @param {UpdateUserObj} param0
     */
    static async setUser({ user_id, toUpdate }) {
        let user = User.findById({ user_id });
        if (!user) {
            const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }
        dayjs.locale('ko');
        const date = dayjs();
        const updatedAt = date.format('YYYY-MM-DD HH:mm:ss');

        let changeUpdate = {};
        changeUpdate.updatedAt = updatedAt;
        if (toUpdate.name) changeUpdate.name = toUpdate.name;
        if (toUpdate.email) changeUpdate.email = toUpdate.email;
        if (toUpdate.password) changeUpdate.password = await bcrypt.hash(toUpdate.password, 10);
        if (toUpdate.description) changeUpdate.description = toUpdate.description;
        // console.log(changeUpdate);

        return User.update({ user_id, changeUpdate });
    }

    /**
     * user_id로 유저 정보 가져오기
     * @param {{user_id: string}} user_id
     */
    static async getUserInfo({ user_id }) {
        const user = User.findById({ user_id });
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!user) {
            const errorMessage = '해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        return user;
    }

    /**
     * 프로필 이미지 저장
     * @param {{user_id: string, url: string}} idAndUrl
     */
    static async updateImg({ user_id, url }) {
        const toUpdate = { profileUrl: url };
        const updatedUser = await User.updateImg({ user_id, toUpdate });

        if (!updatedUser) {
            const errorMessage = '이미지 업로드에 실패 했습니다.';
            return { errorMessage };
        }

        // gcp 기존 이미지 삭제
        if (updatedUser.profileUrl != '') {
            const url = updatedUser.profileUrl.split(
                `https://${process.env.GCS_BUCKET}.storage.googleapis.com/`,
            )[1];
            gcsBucket.file(url).delete();
        }

        return updatedUser;
    }

    /**
     * 임시 비밀번호 전송
     * @param {{email: string}} param0
     */
    static async sendNewpassword({ email }) {
        const temp_pw = uuidv4().split('-')[0];
        await sendMail(
            email,
            '[의자왕] 임시비밀번호 보내드립니다.',
            `임시비밀번호는 [${temp_pw}]입니다.\n 
            로그인 이후 꼭 비밀번호를 변경해주세요!`,
        );

        const user_id = await User.findByEmail({ email }).then((data) => data.id);
        const password = await bcrypt.hash(temp_pw, 10);
        const changeUpdate = { password };
        const user = User.update({ user_id, changeUpdate });
        return user;
    }

    /**
     * 삭제할 계정 관련된 데이터 전부 삭제
     * @param {{id: string}} id - 유저 아이디
     * @returns {void}
     */
    static async deleteUser({ id }) {
        const roomAr = await userStudyRoomsService.getRooms({ id });
        const otherRoomAr = await userStudyRoomsService.getOtherRooms({ id });
        Promise.all([
            User.deleteUser({ id }),
            TimeLog.deleteUser({ id }),
            TotalTime.deleteUser({ id }),
            UserDailySheet.deleteUser({ id }),
            Applicants.deleteManyById({ id }),
            roomAr.map(async (room) => {
                const { roomId, id } = room;
                await userStudyRoomsService.delRoom({ id, roomId });
            }),
            otherRoomAr.map(async (room) => {
                const { members, roomId } = room;
                const delAr = members.filter((userId) => userId !== id);
                const updateChange = { delAr };
                await userStudyRoomsService.updateRoom({ roomId, updateChange });
            }),
        ]);
        await Comments.changeWithdrawalComments({ id });
        return;
    }
}

export { userAuthService };
