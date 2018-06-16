if(sessionStorage.user){
    var usr = JSON.parse(sessionStorage.user);
}
$(function () {
    getMailInfo();
    newMail();
});

function newMail() {
    $('#new-mail').on('click', function() {
        $('#add-mail').modal({
            relatedTarget: this,
            onConfirm: function(e) {
                let userName = e.data;

            },
            onCancel: function() {
                $("#prompt").text("请输入用户名：");
            }
        });
    });
}

function genMail(name, avatar, content, time, uid) {
    return "<div class=mail-item>\n" +
        "                    <a href=home.html?id=" + uid + ">" +
        "                        <img src=" + avatar + ">" +
        "                    </a>\n" +
        "                    <p class=name>" + name + "</p>\n" +
        "                    <p class=content>\n" +
        "                        <a href=mail-send.html?id=" + uid + ">" +content +"</a>\n" +
        "                    </p>\n" +
        "                    <p class=\"time\">" + time + "</p>\n" +
        "                </div>";
}

function getMailInfo() {
    $.ajax({
        url: "http://localhost:8080/message/id/" + usr.id,
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){
                $(".mail-list").empty();
                $.each(res.data, function () {

                    $(".mail-list").append(genMail(this.nickname, this.avatar, this.content, this.create_time, this.user_id));
                })
            }
        }
    });
}