export default class BaseMongoService {
    constructor(collection, options) {
        this.collection = collection;
        this.options = options;
    }

    find(query, options) {
        return this.collection.find(query);
    }

    findOne(query, options) {
        return this.find(query, options)
            .then(docs => {
                if (docs.length === 0) {
                    return null;
                }

                return docs[0];
            });
    }

    create(data, options) {
        return new this.collection(data).save();
    }

    updateOne(query, updateFunc, options) {
        return this.findOne(query, options)
            .then(doc => {
                if (doc) {
                    updateFunc(doc);
                }

                return this.collection.update(query, doc).then(() => doc);
            });
    }

    exists(query, options) {
        return this.findOne(query, options)
            .then(doc => {
               return doc !== null;
            });
    }
}