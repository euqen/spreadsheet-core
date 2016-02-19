import db from './../../utils/mongo';

let service = db.service('user', require('./user.schema'));

export default service;