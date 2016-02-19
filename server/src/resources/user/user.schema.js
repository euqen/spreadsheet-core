import mongo from 'mongoose';

export default new mongo.Schema({
    username: {type: String, required: true}
});