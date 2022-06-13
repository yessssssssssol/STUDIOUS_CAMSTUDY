import { UserModel } from '../schemas/user';

class User {
    static create({ newUser }) {
        return UserModel.create(newUser);
    }

    static findByEmail({ email }) {
        return UserModel.findOne({ email });
    }

    static findById({ user_id }) {
        return UserModel.findOne({ id: user_id });
    }

    static findAll() {
        return UserModel.find({});
    }

    static update({ user_id, fieldToUpdate, newValue }) {
        const filter = { id: user_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        return UserModel.findOneAndUpdate(filter, update, option);
    }

    static updateImg({ user_id, toUpdate }) {
        const filter = { id: user_id };
        const update = { $set: toUpdate };
        // 기존 이미지 삭제를 위해서 Original을 리턴
        const option = { returnOriginal: true };

        return UserModel.findOneAndUpdate(filter, update, option);
    }

    static deleteUser({ id }) {
        return UserModel.findOneAndDelete({ id });
    }
}

export { User };
