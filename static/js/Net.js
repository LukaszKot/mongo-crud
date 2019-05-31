class Net {

    createUser(username, password) {
        var body = {
            username: username,
            password: password
        }
        return this.sendData("/users", "POST", body);
    }

    sendData(url, method, body) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                data: JSON.stringify(body),
                type: method,
                contentType: "application/json",
                success: function (data) {
                    resolve(data)
                },
                error: function (xhr, status, error) {
                    reject(JSON.parse(xhr.responseText))
                },
            });
        })
    }
}