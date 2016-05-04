import mongo from 'mongoose';

export default new mongo.Schema({
    name: {type: String, required: true},
    createdOn: {type: Date, required: true},
    createdBy: {type: Object, required: true},
    isRemoved: {type: String, required: false}
});