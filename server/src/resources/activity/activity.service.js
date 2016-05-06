import db from './../../utils/mongo';

let service = db.service('activity', require('./activity.schema'));

export default service;