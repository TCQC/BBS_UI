var $prefix;

$(function () {
    comment();
    starButton();
});

//initial method to start all functions on comment
function comment() {

    $(".ta").focus(function () {
        $(this).parent(".am-form-group").children(".buttons").css("display" ,"block");
    });

    $(".cancel").click(function () {
        $(this).parents(".am-form-group").children(".buttons").css("display" ,"none");
        $(this).parents(".am-form-group").children(".ta").val("");
    });

    $(".pub").click(function () {
        var $buttons = $(this).parents(".am-form-group").children(".buttons");
        var $ta = $(this).parents(".am-form-group").children(".ta");
        $.ajax({

        });
        $buttons.css("display" ,"none");
        $ta.val("");
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

function starButton() {

    //todo 检测用户是否登陆，未登陆，按钮不给予显示
    //todo 通过ajax查询帖子是否被收藏，根据结果来显示按钮样式
    star();

    $('#star-btn').click(function () {
        $('#my-prompt-star').modal({
            relatedTarget: this,

            onConfirm: function (e) {
                //todo 获得所选分类的id值，结合帖子的id进行ajax操作，收藏帖子

                //改变按钮的样式
                unstar();   //变为未收藏
            },
            onCancel: function () {
            }
        });
    });

    $("#unstar-btn").click(function () {

        $('#my-confirm-unstar').modal({
            relatedTarget: this,
            onConfirm: function() {

                //改变按钮的样式
                star();
            },
            // closeOnConfirm: false,
            onCancel: function() {
            }
        });
    });
}

function star() {
    $("#star-btn").css({ display: "" });
    $("#unstar-btn").css({ display: "none" });
}

function unstar() {
    $("#star-btn").css({ display: "none" });
    $("#unstar-btn").css({ display: "" });
}




