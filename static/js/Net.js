class Net {

    createUser(username, password) {
        var body = {
            username: username,
            password: password
        }
        return this.sendData("/users", "POST", body);
    }

    getAll() {
        return this.sendData("/users", "GET", null);
    }

    remove(id) {
        return this.sendData("/users/" + id, "DELETE", null);
    }

    update(id, password) {
        return this.sendData("/users", "PUT", { id: id, password: password })
    }

    sendData(url, method, body) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                data: body ? JSON.stringify(body) : null,
                type: method,
                contentType: "application/json",
                success: function (data) {
                    resolve(data)
                },
                error: function (xhr, status, error) {
                    reject(xhr.responseText)
                },
            });
        })
    }
}