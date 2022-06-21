import { Schema, model } from 'mongoose';

const ApplicantsSchema = new Schema({
    // 방 아이디
    roomId: {
        type: String,
    },
    // 신청자 아이디
    applicantId: {
        type: String,
        required: true,
    },
    // 신청 상태
    status: {
        type: Boolean,
        required: true,
    },
    // 지원 시간
    createdAt: {
        type: String,
        required: true,
    },
});

const ApplicantsModel = model('Applicants', ApplicantsSchema);

export { ApplicantsModel };
