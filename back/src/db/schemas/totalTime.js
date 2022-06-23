import { Schema, model } from 'mongoose';

const TotalTimeSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    totalTime: {
        type: String,
        // required: true,
        default: '00:00:00',
    },
});

const TotalTimeModel = model('TotalTime', TotalTimeSchema);

export { TotalTimeModel };
