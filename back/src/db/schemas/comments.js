import { Schema, model } from 'mongoose';

const CommentsSchema = new Schema({
    //방 만든 사람 아이디
    targetId: {
        type: String,
    },
    // 댓글 쓴 사람 아이디
    writerId: {
        type: String,
        required: true,
    },
    //방 아이디
    roomId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: String,
        required: true,
    },
});

const CommentsModel = model('Comments', CommentsSchema);

export { CommentsModel };
