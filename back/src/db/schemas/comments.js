import { Schema, model } from 'mongoose';

const commentsSchema = new Schema({
    //방 만든 사람 아이디
    targetId: {
        type: String,
        required: true,
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

const commentsModel = model('comments', commentsSchema);

export { commentsModel };
