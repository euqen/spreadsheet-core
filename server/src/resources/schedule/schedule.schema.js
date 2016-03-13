import mongo from 'mongoose';

export default new mongo.Schema({
    day: {type: String, required: true},
    type: {type: String, required: true},
    title: {type: String, required: true},
    auditory: {type: String, required: false},
    teacher: {type: String, required: true},
    time: {type: Date, required: true}
});