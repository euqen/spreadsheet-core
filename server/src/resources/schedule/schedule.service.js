import db from './../../utils/mongo';

let service = db.service('schedule', require('./schedule.schema'));

export default service;