import { UserModel } from '../schemas/user';

/**
 * 회원가입시 필요한 인자들
 * @typedef {object} NewUserObj
 * @property {object} NewUserObj.newUser - 회원가입시 필요한 것들(name, email, password)
 * @property {string} NewUserObj.newUser.name - 유저 이름
 * @property {string} NewUserObj.newUser.email - 이메일
 * @property {string} NewUserObj.newUser.password - 패스워드
 */

/**
 * 업데이트시 필요한 인자
 * @typedef {object} UpdateUserObj
 * @property {string} UpdateUserObj.user_id - 유저 아이디
 * @property {object} UpdateUserObj.changeUpdate - 업데이트할 항목
 * @property {string} UpdateUserObj.changeUpdate.updatedAt - 업데이트 시각
 * @property {string} [UpdateUserObj.changeUpdate.name] - 이름
 * @property {string} [UpdateUserObj.changeUpdate.email] -  이메일
 * @property {string} [UpdateUserObj.changeUpdate.password] - 비밀번호
 * @property {string} [UpdateUserObj.changeUpdate.description] - 설명
 */

/**
 * @typedef {{id: string, email: string, name: string, description: string, profileUrl: string, createdAt: string, updatedAt: string, _id: string, __v: number}} UserObj
 */

/**
 * @typedef UserArray
 * @property {Promise<UserArray[]>} UserArray
 */

class User {
    /**
     * 새로운 유저 생성
     * @param {NewUserObj} NewUserObj
     * @returns {Promise<UserObj>}
     */
    static create({ newUser }) {
        return UserModel.create(newUser);
    }

    /**
     * 이메일로 유저 정보 찾기
     * @param {email: string} email - 이메일
     * @returns {Promise<UserObj>}
     */
    static findByEmail({ email }) {
        return UserModel.findOne({ email });
    }

    /**
     * 유저 아이디로 유저 정보 찾기
     * @param {user_id: string} user_id - 유저 아이디
     * @returns {Promise<UserObj>}
     */
    static findById({ user_id }) {
        return UserModel.findOne({ id: user_id });
    }

    /**
     * 유저 정보 모두 가져오기
     * @returns {UserArray}
     */
    static findAll() {
        return UserModel.find({});
    }

    /**
     * 유저 정보 변경
     * @param {UpdateUserObj} UpdateUserObj
     * @returns {Promise<UserObj>}
     */
    static update({ user_id, changeUpdate }) {
        const filter = { id: user_id };
        const option = { returnOriginal: false };
        return UserModel.findOneAndUpdate(filter, changeUpdate, option);
    }

    /**
     * 유저 이미지 변경
     * @param {{user_id: string, toUpdate: string}} param0
     * @returns {Promise<UserObj>}
     */
    static updateImg({ user_id, toUpdate }) {
        const filter = { id: user_id };
        const update = { $set: toUpdate };
        // 기존 이미지 삭제를 위해서 Original을 리턴
        const option = { returnOriginal: true };

        return UserModel.findOneAndUpdate(filter, update, option);
    }

    /**
     * 계정 삭제
     * @param {{id: string}} id
     * @returns {Promise<UserObj>}
     */
    static deleteUser({ id }) {
        return UserModel.findOneAndDelete({ id });
    }
}

export { User };
