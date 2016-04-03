import db from './../../utils/mongo';

let service = db.service('group', require('./group.schema'));

export default service;