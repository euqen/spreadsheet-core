import mongo from 'mongoose';

export default new mongo.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: {type: String, required: true},
    group: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    locale: {type: String, required: true},
    isRemoved: {type: Boolean, required: true}
});