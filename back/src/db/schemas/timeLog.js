import { Schema, model } from 'mongoose';

const TimeLogSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    startTimeNum: {
        type: Number,
        required: true,
    },
    endTimeNum: {
        type: Number,
        required: true,
    },
    studyTimeNum: {
        type: Number,
        required: true,
    },
    // 공부한 시간(시분초)
    studyTimeStr: {
        type: String,
        required: true,
    },
});

const TimeLogModel = model('TimeLog', TimeLogSchema);

export { TimeLogModel };
