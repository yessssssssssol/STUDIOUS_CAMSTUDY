import { Schema, model } from 'mongoose';

const UserDailySheetSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    timeGoal: {
        type: ing,
        required: true,
    },
    studyTimeADay: {
        type: String,
        required: true,
    },
    bestStudyTime: {
        type: String,
        required: true,
    },
    beginStudyTime: {
        type: String,
        required: true,
    },
    finishStudyTime: {
        type: String,
        required: true,
    },
});

const UserDailySheetModel = model('UserDailySheet', UserDailySheetSchema);

export { UserDailySheetModel };
