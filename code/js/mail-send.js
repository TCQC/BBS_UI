//获得对方id
var uid = getRequest("id");
var u_avatar;
var u_nickname;
$.ajax({
    url: "http://localhost:8080/user/id/" + uid,
    method: "get",
    dataType: "json",
    success: function (res) {
        if(res.status){
            u_avatar = res.data.avatar;
            u_nickname = res.data.nickname;
        }
    }
});

//获得我方id
if(sessionStorage.user){
    var usr = JSON.parse(sessionStorage.user);
}

$(function () {
    $("#btn-cmt").click(msgRep);
    getMsgList();

});

function msgRep() {
    var msg = $("#ta-cmt").val();

    if(msg !== ""){

        let user = "鸡王";
        let $newLi = $("<li>\n" +
            "<img src=http://ask.amazeui.org/uploads/avatar/000/00/59/45_avatar_mid.jpg>\n" +
            "<div class=item-rep>\n" +
            "<p class=content>\n" +
            "<span class=user>" + user+ ":</span>\n" +
            "<span>" + msg + "</span>\n" +
            "</p>\n" +
            "<p class=time>2018-05-31 12:36</p>\n" +
            "</div>\n" +
            "</li>");

        $(".msg-list ul").append($newLi);
        $("#ta-cmt").val("")
    }
}

function getRequest(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

function getMsgList() {
    $.ajax({
        url: "http://localhost:8080/message/one/" + uid + "/two/" + usr.id,
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){
                $(".msg-list ul").empty();
                $.each(res.data, function () {
                    if(this.receiver_id === usr.id){
                        $(".msg-list ul").append(genOpMsg(this.content, this.create_time));
                    } else {
                        $(".msg-list ul").append(genMyMsg(this.content, this.create_time));
                    }
                })
            }
        }
    });
}

function genOpMsg(content, time) {
    return "<li>\n" +
        "                        <img src=" + u_avatar + ">\n" +
        "                        <div class=item>\n" +
        "                            <p class=content>\n" +
        "                                <span class=user>" + u_nickname + ":</span>\n" +
        "                                <span>" + content + "</span>\n" +
        "                            </p>\n" +
        "                            <p class=\"time\">" + time + "</p>\n" +
        "                        </div>\n" +
        "                    </li>";
}

function genMyMsg(content, time) {
    return "<li>\n" +
        "                        <img src=" + usr.avatar + ">" +
        "                        <div class=item-rep>\n" +
        "                            <p class=content>\n" +
        "                                <span class=\"user\">" + usr.nickname + ":</span>\n" +
        "                                <span>" + content + "</span>\n" +
        "                            </p>\n" +
        "                            <p class=time>" + time + "</p>\n" +
        "                        </div>\n" +
        "                    </li>";
}