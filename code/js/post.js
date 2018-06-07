$(function () {
    $(".info").height($(".main").height() - 40);
    comment();
});

//initial method to start all functions on comment
function comment() {
    $(".ta").focus(showButtons);
    $(".ta").blur(hideButtons);

    $("#cancel").click(hideButtons);

    //事件委托，让后来加入的回复也具有绑定事件
    $(".comt-list").delegate(".reptag", "click", function () {
        //找到要at谁
        var atWhom = "@" + $(this).parent(".am-comment-meta").children(".am-comment-author").text() + " ";

        //找到对应的评论区
        var $ta = $(this).parents(".comt").children(".am-form").children(".am-form-group").children(".ta");

        var prompt = $ta.val() + atWhom;
        $ta.val(prompt);

        return false;
    })

}


//show buttons relating to comment operation
function showButtons() {
    $("#buttons").css("display" ,"block");
}
function hideButtons() {
    $("#buttons").css("display" ,"none");
}
