var $prefix;

$(function () {
    getPostInfo();
    starButton();
    comment();
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

function getPostInfo() {
    $.ajax({
        url: "http://localhost:8080/post/id/" + getRequest("id"),
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){

                //修改了帖子的基本信息
                $(".main .title h1").text(res.data.title);
                $(".article p").text(res.data.content);
                $(".status .time").text(res.data.updateTime);
                $(".status #comt-count").text("" + res.data.comments.length);

                //添加发起人的基本信息
                $(".info .sponsor img").attr("src", res.data.userInfo.avatar);
                $(".info .sponsor a").attr("href", "home.html?id=" + res.data.userInfo.id);
                $(".info .sponsor a").text(res.data.userInfo.nickname);

                //添加评论和对应的回复
                $(".comt-list").append("<div class=comt><div>");
                var aCommt = res.data.comments[0];
                //$("comt-list").append(genCmt(aCommt.));
            }

        }
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

function unLogin() {
    $("#star-btn").css({ display: "none" });
    $("#unstar-btn").css({ display: "none" });
}

//name:url中的变量值
function getRequest(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

function genCmt(uid, uimg, nickname, time ,content) {
    return "<article class=am-comment>\n" +
        "                        <a href=home.html?id=>" + uid + "\n" +
        "                            <img class=am-comment-avatar src=" + uimg + ">" +
        "                        </a>\n" +
        "                        <div class=am-comment-main>\n" +
        "                            <header class=am-comment-hd>\n" +
        "                                <div class=am-comment-meta>\n" +
        "                                    <a href=home.html?id=" + uid + "class=am-comment-author>" + nickname + "</a> \n" +
        "                                    评论于 <time>" + time + "</time> \n" +
        "                                    <a href=# class=reptag>回复</a>\n" +
        "                                </div>\n" +
        "                            </header>\n" +
        "                            <div class=\"am-comment-bd\">" + content + "</div>\n" +
        "                        </div>\n" +
        "                    </article>";
}



