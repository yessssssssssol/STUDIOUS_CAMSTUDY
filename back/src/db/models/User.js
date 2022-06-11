import { UserModel } from '../schemas/user';

class User {
    static async create({ newUser }) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    static async findByEmail({ email }) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    static async findById({ user_id }) {
        const user = await UserModel.findOne({ id: user_id });
        return user;
    }

    static async findAll() {
        const users = await UserModel.find({});
        return users;
    }

    static async update({ user_id, fieldToUpdate, newValue }) {
        const filter = { id: user_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }

    static async updateImg({ user_id, toUpdate }) {
        const filter = { id: user_id };
        const update = { $set: toUpdate };
        // 기존 이미지 삭제를 위해서 Original을 리턴
        const option = { returnOriginal: true };

        return await UserModel.findOneAndUpdate(filter, update, option);
    }

    static deleteUser({ id }) {
        return UserModel.findOneAndDelete({ id });
    }
}

export { User };
