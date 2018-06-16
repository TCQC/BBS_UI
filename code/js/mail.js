if(sessionStorage.user){
    var usr = JSON.parse(sessionStorage.user);
}
$(function () {
    getMailInfo();
    newMail();
    getHot();
});

function newMail() {
    $('#new-mail').on('click', function() {
        $('#add-mail').modal({
            relatedTarget: this,
            onConfirm: function(e) {
                if(e.data){
                    $.ajax({
                        url: "http://localhost:8080/user?nickname=" + e.data,
                        method: "get",
                        dataType: "json",
                        success: function (res) {
                            if(res.status){
                                 window.location.href = "mail-send.html?id=" + res.data;
                            } else {
                                $("#my-alert").modal({});
                            }
                        }
                    });
                }
            },
            onCancel: function() {}
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


function getHot() {
    $.ajax({
        url: 'http://localhost:8080/post/hot',
        dataType: 'json',
        async: true,
        type: 'get',
        success: function (result) {
            if (result.status) {
                updateHot(result.data);
            }
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    })
}

function updateHot(data) {
    $('#hot').html('');
    $.each(data, function (index, item) {
        $('#hot').append(
            $('<li>')
                .attr('class', 'folder')
                .append(
                    $('<a>')
                        .attr('href', 'post.html?id=' + item.id)
                        .append(item.title)
                )
        )
    })
}