var ObjectID = require('mongodb').ObjectID;
class UserService {
    constructor(db) {
        db.createCollection("users", (err, coll) => {
            this.collection = coll;
        })


    }

    insert(data) {
        return new Promise((accept, reject) => {
            this.collection.insert(data, (err, result) => {
                if (err) reject(err);
                accept(result)
            })
        })

    }

    getAll() {
        return new Promise((accept, reject) => {
            this.collection.find({}).toArray(function (err, items) {
                if (err) reject(err);
                accept(items)
            });
        })
    }

    delete(id) {
        return new Promise((accept, reject) => {
            this.collection.remove({ _id: ObjectID(id) }, function (err, data) {
                if (err) reject(err);
                accept();
            })

        })
    }

    update(id, password) {
        return new Promise((accept, reject) => {
            this.collection.updateOne(
                { _id: ObjectID(id) },
                { $set: { password: password } },
                (err, data) => {
                    if (err) reject(err);
                    accept(data)
                })
        })
    }
}

module.exports = { UserService }