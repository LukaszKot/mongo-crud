var net;
$(document).ready(() => {
    net = new Net();
    net.getAll()
        .then(x => {
            $("#data").val(JSON.stringify(x))
                .width(1000)
                .height(500)

            x.forEach(element => {
                $("#chooseId").append($("<option>").html(element._id));
            });
        })

    $("#add").on("click", () => {
        var username = $("#username").val();
        var password = $("#password").val();
        net.createUser(username, password)
            .then(x => {
                return net.getAll()
            })
            .then(x => {
                $("#data").val(JSON.stringify(x))
            })
    })

    $("#refesh").on("click", () => {
        console.log("hier")
        net.getAll()
            .then(x => {
                $("#data").val(JSON.stringify(x))
            })
    })
})