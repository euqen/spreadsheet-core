import db from './../../utils/mongo';

let service = db.service('subject', require('./subject.schema.js'));

export default service;