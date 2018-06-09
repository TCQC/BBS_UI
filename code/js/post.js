var $prefix;

$(function () {
    adjustHeight();
    comment();
});

//initial method to start all functions on comment
function comment() {

    $(".ta").focus(function () {
        $(this).parent(".am-form-group").children(".buttons").css("display" ,"block");
        adjustHeight();
    });

    $(".cancel").click(function () {
        $(this).parents(".am-form-group").children(".buttons").css("display" ,"none");
        $(this).parents(".am-form-group").children(".ta").val("");
        adjustHeight();
    });

    $(".pub").click(function () {
        var $buttons = $(this).parents(".am-form-group").children(".buttons");
        var $ta = $(this).parents(".am-form-group").children(".ta");
        $.ajax({

        });
        $buttons.css("display" ,"none");
        $ta.val("");
        adjustHeight();
    });


    //事件委托，让后来加入的回复也具有绑定事件
    $(".comt-list").delegate(".reptag", "click", function () {
        //找到要at谁
        var atWhom = "@" + $(this).parent(".am-comment-meta").children(".am-comment-author").text() + " ";

        //找到对应的评论区
        var $ta = $(this).parents(".comt").children(".am-form").children(".am-form-group").children(".ta");

        var prompt = $ta.val() + atWhom;
        //用于从存数据库
        $prefix = "<span>" + prompt +"</span>";

        //显示在界面上
        $ta.val(prompt);
        return false;
    })
}

function adjustHeight() {
    $(".info").height($(".main").height() - 40);
}

//show buttons relating to comment operation

