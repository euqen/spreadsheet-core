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

                return docs[0].toObject();
            });
    }

    create(data, options) {
        const model = new this.collection(data);
        return model.save()
            .then(doc => {
                return doc.toObject();
            })
            .catch(err => {
                console.log(err);
                throw new Error(err.errors);
            });
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