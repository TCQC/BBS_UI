$(function () {
    $("#btn-cmt").click(msgRep);
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

        $(".msg-list").append($newLi);
        $("#ta-cmt").val("")
    }
}