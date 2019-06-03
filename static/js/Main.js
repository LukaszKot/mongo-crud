var net;
$(document).ready(async () => {
    net = new Net();
    var users = await net.getAll()
    $("#data").val(JSON.stringify(users))
        .width(1000)
        .height(500)
    users.forEach(element => {
        $("#chooseId").append($("<option>").html(element._id));
    });
    $("#add").on("click", async () => {
        var username = $("#username").val();
        var password = $("#password").val();
        await net.createUser(username, password)
        var users = await net.getAll()
        $("#data").val(JSON.stringify(users))
        $("#chooseId").empty();
        users.forEach(element => {
            $("#chooseId").append($("<option>").html(element._id));
        });
    })
    $("#refresh").on("click", async () => {
        var users = await net.getAll()
        $("#data").val(JSON.stringify(users))
        $("#chooseId").empty();
        users.forEach(element => {
            $("#chooseId").append($("<option>").html(element._id));
        });
    })

    $("#update").on("click", async () => {
        var id = $("#chooseId").val();
        var password = $("#password").val();
        await net.update(id, password);
        var users = await net.getAll()
        $("#data").val(JSON.stringify(users))
        $("#chooseId").empty();
        users.forEach(element => {
            $("#chooseId").append($("<option>").html(element._id));
        });
    })

    $("#delete").on("click", async () => {
        var id = $("#chooseId").val();
        await net.remove(id);
        var users = await net.getAll()
        $("#data").val(JSON.stringify(users))
        $("#chooseId").empty();
        users.forEach(element => {
            $("#chooseId").append($("<option>").html(element._id));
        });
    })

})

