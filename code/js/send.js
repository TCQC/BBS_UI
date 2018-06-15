var isPost = true;

$(function () {
    addBlockInfo();
    catInfo();
    toggle();
    send();
});

function toggle() {
    $(".info").height($(".main").height() - 51);

    $(".t").css({ display: "" });
    $(".q").css({ display: "none" });
    $(".main .title li").click(function () {

        //tab shift
        $(".main .title li").removeClass("select");
        $(this).addClass("select");

        if($(this).text() === "文章"){
            isPost = true;
            $(".t").css({ display: "" });
            $(".q").css({ display: "none" });
        } else {
            isPost = false;
            $(".q").css({ display: "" });
            $(".t").css({ display: "none" });
        }

        $(".info").height($(".main").height());
    })
}

function send() {
    $(".pub button").click(function () {

        if(checkContent() && checkTitle()){

            let title = $(".rtc input").val();
            let content = $(".post-body textarea").val();

            if(sessionStorage.user){//再次确认登陆信息

                var usr = JSON.parse(sessionStorage.user);
                var cid = "1";

                if(isPost)  //是普通帖子，就要获得发送的分类值
                    cid = getCatId;
                
                $.ajax({
                    url: "http://localhost:8080/post",
                    method: "post",
                    dataType: "json",
                    data: {
                        "userId": usr.id,
                        "categoryId": cid,
                        "title": title,
                        "content": content
                    },
                    success: function (res) {
                        if(res.status){
                            window.location.href = "post.html?id=" + res.data;
                        }
                    }
                });
            }
        }
    })
}

function checkTitle() {
    return $(".rtc input").val();
}

function checkContent() {
    return $(".post-body textarea").val();
}

function getCatId() {
    return $("#cat").val();
}

function addBlockInfo() {
    $.ajax({
        url: "http://localhost:8080/block",
        method: "get",
        dataType: "json",
        success: function (res) {
            if (res.status) {

                $("#block").empty();

                $.each(res.data, function () {
                    if(this.id !== 1){  //排除问答版块
                        $("#block").append(genOption(this.id, this.name))
                    }
                });
            }
        }
    });
}

function genOption(id, name) {
    return "<option value=" + id + ">" + name + "</option>>"
}


//根据版块下拉菜单的信息变化，动态加载分类信息
function catInfo() {
    $("#block").change(function () {
        let catId = $(this).val();

        $.ajax({
            url: "http://localhost:8080/block/id/" + catId,
            method: "get",
            dataType: "json",
            success: function (res) {
                if(res.status){
                    $("#cat").empty();
                    $.each(res.data.categories, function () {
                        $("#cat").append(genOption(this.id, this.name))
                    })
                }
            },
            error: function (x) {
                console.log(x.status);
            }
        });
    });
}
