import mongo from 'mongoose';

export default new mongo.Schema({
    studentId: {type: String, required: true},
    createdOn: {type: Date, required: true},
    teacherId: {type: String, required: true},
    date: {type: String, required: false},
    time: {type: String, required: false},
    subjectId: {type: String, required: true},
    value: {type: Number, required: false},
    presence: {type: Boolean, required: false}
});