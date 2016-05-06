import mongo from 'mongoose';

export default new mongo.Schema({
    day: {type: String, required: true},
    type: {type: String, required: true},
    subject: {type: Object, required: true},
    auditory: {type: String, required: false},
    teacher: {type: Object, required: true},
    group: {type: Object, required: true},
    time: {type: String, required: true}
});