class UserService {
    constructor(db) {
        this.collection = _db.getCollection('users');
    }

    insert(data) {
        return new Promise((accept, reject) => {
            this.collection.insert(data, (err, result) => {
                if (err) reject(err);
                accept(result)
            })
        })

    }
}