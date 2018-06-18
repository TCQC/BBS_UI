var $prefix = "";
$(function () {
    //加载帖子的基本信息，评论回复等等
    getPostInfo();

    //根据用户登陆状态决定显示的功能接口，是startButton函数的先决条件
    starButton();

    //确定所有的功能
    comment();

    //获得推荐帖子
    getHot();
});

//initial method to start all functions on comment
function comment() {
    //全部进行事件委托
    let user = JSON.parse(sessionStorage.user);

    $(".main").delegate(".ta", "focus", function () {
        $(this).parent(".am-form-group").children(".buttons").css("display" ,"block");
    });

    //cancel event
    $(".main").delegate(".cancel", "click", function () {
        $(this).parents(".am-form-group").children(".buttons").css("display" ,"none");
        $(this).parents(".am-form-group").children(".ta").val("");
        $prefix = "";
    });

    //单击pub后的事件
    $(".main").delegate(".pub", "click", function () {
        var $buttons = $(this).parents(".am-form-group").children(".buttons");
        var $ta = $(this).parents(".am-form-group").children(".ta");
        let $xx = $(this).parents(".login");
        let content = $prefix + $ta.val().substr($ta.val().lastIndexOf("•") + 1);
        let cid = $(this).parents(".comt").children(".am-comment")[0].id;

        $.ajax({
            url: "http://localhost:8080/reply",
            // dataType: "json",
            method: "post",
            async: true,
            data: {
                "userId": user.id,
                "commentId": cid,
                "content": content
            },
            success: function (res) {
                if(res.status) {
                    let $aRep = genRep(user.id, user.avatar, user.nickname, "刚刚", content);
                    $xx.before($aRep);
                    $buttons.css("display" ,"none");
                }
            },
            error: function (x) {
                console.log(x.status);
            }
        });

        //clear cache
        $ta.val("");
        $prefix = "";
    });

    //评论事件
    $("#btn-cmt").on("click", function () {
        let content = $(".ta-cmt")[0].value;

        if(content !== ""){
            //ajax
            $.ajax({
                url: "http://localhost:8080/comment",
                method: "post",
                dataType: "json",
                data: {
                    "userId": user.id,
                    "postId": getRequest("id"),
                    "content": content
                },
                success: function (res) {
                    if(res.status){
                        let $commentLi = genCmt(res.data, user.id, user.avatar, user.nickname, "刚刚评论",content);
                        $(".comt-list").append($commentLi);
                        $(".ta-cmt")[0].value = "";

                    }
                },
                error:function (x) {
                    console.log(x.status);
                }
            });
        }
    });

    //事件委托，让后来加入的回复也具有绑定事件
    $(".main").delegate(".reptag", "click", function () {
        //找到要at谁
        var atWhom = "@" + $(this).parent(".am-comment-meta").children(".am-comment-author").text() + "• ";

        //找到对应的评论区
        var $ta = $(this).parents(".comt").children(".am-form").children(".am-form-group").children(".ta");

        var prompt = $ta.val() + atWhom;
        //用于从存数据库
        $prefix = "<span class=at>" + prompt +"</span>";

        //显示在界面上
        $ta.val(prompt);
        return false;
    });
}

function starButton() {

    //用户登录后来操作收藏功能
    if(sessionStorage.user){
        let user = JSON.parse(sessionStorage.user);
        var tid;

        //检测用户是否已经收藏了这个帖子
        //通过ajax查询帖子是否被收藏，根据结果来显示按钮样式
        $.ajax({
            url: "http://localhost:8080/star/check/" + user.id + "/" + getRequest("id"),
            method: "post",
            dataType: "json",
            success: function (res) {
                if(res.status){
                    //说明用户已经收藏了这个帖子
                    tid = res.data.id;  //存下这个id号，用来取消收藏之用
                    unstar();
                } else {
                    star();
                }
            }
        });

        $('#star-btn').click(function () {
            // 获得所选分类的id值，结合帖子的id进行ajax操作，收藏帖子
            var user = JSON.parse(sessionStorage.user);

            $.ajax({
                url: "http://localhost:8080/favorite/user/" + user.id,
                method: "get",
                dataType: "json",
                success: function (res) {
                    $(".am-modal-prompt-input").empty();
                    $.each(res.data, function () {
                        let $option = $("<option value=" + this.id + ">" + this.name + "</option>");
                        $(".am-modal-prompt-input").append($option);
                    })
                }
            });

            //弹出模态框，进行文件夹的选择
            $('#my-prompt-star').modal({
                relatedTarget: this,

                onConfirm: function (e) {

                    $.ajax({
                        url: "http://localhost:8080/star",
                        method: "post",
                        dataType: "json",
                        data: {
                            "favoriteId": e.data,
                            "postId": getRequest("id")
                        },
                        success: function (res) {
                            console.log(res);
                            unstar();   //改变按钮的样式,变为未收藏
                        },
                    });

                },
                onCancel: function () {
                }
            });
        });

        //点击取消收藏后的模态框
        $("#unstar-btn").click(function () {

            $('#my-confirm-unstar').modal({
                relatedTarget: this,
                onConfirm: function() {
                    // todo
                    $.ajax({
                        url: "http://localhost:8080/star/id/" + tid,
                        dataType: "json",
                        type: "delete",
                        success: function () {
                            //
                        }
                    });
                    //改变按钮的样式
                    star();
                },
                onCancel: function() {
                }
            });
        });
    }//end if
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
                let start = "<div class=comt>";
                let end = "<div>";
                let repArea = genRepArea();

                $.each(res.data.comments, function () {
                    let cmtAndRep = genCmt(this.id, this.userInfo.id, this.userInfo.avatar, this.userInfo.nickname, this.updateTime, this.content);

                    //对所有评论进行操作
                    let rplist = "";
                    $.each(this.replies, function (){
                        rplist += genRep(this.userInfo.id, this.userInfo.avatar, this.userInfo.nickname, this.updateTime, this.content);
                    });

                    $(".comt-list").append(start + cmtAndRep + rplist + repArea + end);
                });

                checkRepArea();
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

function genCmt(cid, uid, uimg, nickname, time ,content) {
    return "<article class=am-comment id=" + cid + ">" +
        "                        <a href=home.html?id=" + uid + " target=_blank" + ">\n" +
        "                            <img class=am-comment-avatar src=" + uimg + ">" +
        "                        </a>\n" +
        "                        <div class=am-comment-main>\n" +
        "                            <header class=am-comment-hd>\n" +
        "                                <div class=am-comment-meta>\n" +
        "                                    <a href=home.html?id=" + uid + " class=am-comment-author target=_blank>" + nickname + "</a> \n" +
        "                                    评论于 <time>" + time + "</time> \n" +
        "                                    <a href=# class=reptag>回复</a>\n" +
        "                                </div>\n" +
        "                            </header>\n" +
        "                            <div class=am-comment-bd>" + content + "</div>\n" +
        "                        </div>\n" +
        "                    </article>";
}

function genRepArea() {
    return "<div class='am-form login'>\n" +
        "                        <div class=am-form-group>\n" +
        "                            <textarea class=ta placeholder=回复一下... rows=1></textarea>\n" +
        "                            <div class=buttons>\n" +
        "                                <button class=\"am-btn am-btn-success am-btn-xs pub\">发表</button>\n" +
        "                                <button class=\"am-btn am-btn-default am-btn-xs cancel\">取消</button>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>";
}

function genRep(uid, uimg, nickname, time, content) {
    return "<div class=reply>" +
        "                  <article class=am-comment>\n" +
        "                        <a href=home.html?id=" + uid + " target=_blank" + ">\n" +
        "                            <img class=am-comment-avatar src=" + uimg + ">" +
        "                        </a>\n" +
        "                        <div class=am-comment-main>\n" +
        "                            <header class=am-comment-hd>\n" +
        "                                <div class=am-comment-meta>\n" +
        "                                    <a href=home.html?id=" + uid + " class=am-comment-author target=_blank>" + nickname + "</a> \n" +
        "                                    回复于 <time>" + time + "</time> \n" +
        "                                    <a href=# class=reptag>回复</a>\n" +
        "                                </div>\n" +
        "                            </header>\n" +
        "                            <div class=am-comment-bd>" + content + "</div>\n" +
        "                        </div>\n" +
        "                    </article>" +
        "                </div>";
}

function checkRepArea() {

    if(!sessionStorage.user){
        $(".bottom").css({ display: "none" });
        $(".cmt-unlogin").css({display: ""});
        $(".login").css({display: "none"});
        unLogin();  //不显示收藏
    } else {
        $(".bottom").css({ display: "" });
        $(".cmt-unlogin").css({display: "none"});
    }
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