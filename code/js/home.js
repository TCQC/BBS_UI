var uid = getRequest("id");
var $uinfo;

$(function () {
    basicInfo();
    toggle();
    getHot();
});


function getRequest(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

function toggle() {

    let $lis = $(".tabs li");

    $lis.click(function () {
        $lis.removeClass("select");
        $(this).addClass("select");

        var type = $(this).attr("id");

        if(type === "post"){
            $(".item-list").empty();

            //进行用户信息比对，实现编辑post的功能
            if(sessionStorage.user){
                var user = JSON.parse(sessionStorage.user);
                if("" + user.id === uid) getMyPosts();
                else getPosts();
            } else {
                getPosts();
            }
        } else if (type === "ask"){
            $(".item-list").empty();

            $.ajax({
                url: "http://localhost:8080/post/question/" + uid + "/page/1/id",
                method: "get",
                dataType: "json",
                success: function (res) {
                    if(res.status){
                        $.each(res.data, function () {
                            $(".item-list").append(genPost(this.id, this.title, this.commentSum, this.favoriteSum, this.updateTime));
                        });
                    }
                }
            });

        } else if (type === "cmt"){
            $(".item-list").empty();
            $.ajax({
                url: "http://localhost:8080/comment/user/id/" + uid,
                method: "get",
                dataType: "json",
                success: function (res) {
                    if(res.status){
                        $.each(res.data, function () {
                            $(".item-list").append(genRep(this.p_id, this.p_title, this.content));
                        });
                    }
                }
            });

        } else {  //absolutely it is info
            $(".item-list").empty();
            $(".item-list").append($uinfo);
        }
    });
}


function genPost(pid, title, nc, ns, time) {
    return "<div class=post-item>" +
        "                        <h4>\n" +
        "                            <a href=post.html?id=" + pid + ">" + title + "</a>\n" +
        "                        </h4>\n" +
        "                        <p>\n" +
        "                            <span>" + nc + "</span>次评论 •\n" +
        "                            <span>" + ns +"</span> 个收藏 •\n" +
        "                            <span>" + time + "</span>\n" +
        "                        </p>" +
        "                    </div>"
}

function genMyPost(pid, title, nc, ns, time) {
    return "<div class=post-item>" +
        "                        <h4>\n" +
        "                            <a href=post.html?id=" + pid + ">" + title + "</a>\n" +
        "                        </h4>\n" +
        "                        <p>\n" +
        "                            <span>" + nc + "</span>次评论 •\n" +
        "                            <span>" + ns +"</span> 个收藏 •\n" +
        "                            <span>" + time + "</span>\n" +
        "                        </p>" +
        "                        <a href=send.html?id=" + pid + " class=edit>" +
        "                        <button class='am-btn-success am-btn-xs am-radius am-btn'>编辑</button>" +
        "                        </a>" +
        "                    </div>"
}

function genRep(pid, title, content) {
    return "<div class=rep-item>\n" +
        "                        <h4>\n" +
        "                            <a href=post.html?id=" + pid + ">" + title + "</a>\n" +
        "                        </h4>\n" +
        "                        <p>\n" +
        "                            <strong>Reply:</strong>\n" +
        "                            <span>"+ content + "</span>\n" +
        "                        </p>\n" +
        "                    </div>"
}

function genInfo(gender, place, time, rank) {
    return "<div class=info-item>\n" +
        "                        <div class=gender>\n" +
        "                            性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：\n" +
        "                            <span>" +  gender +"</span>\n" +
        "                        </div>\n" +
        "                        <div class=rank>\n" +
        "                            用户等级：\n" +
        "                            <span>" + rank + "</span>\n" +
        "                        </div>\n" +
        "                        <div class=work-place>\n" +
        "                            工作地点：\n" +
        "                            <span>" + place +"</span>\n" +
        "                        </div>\n" +
        "                        <div class=time>\n" +
        "                            最后活跃：\n" +
        "                            <span>" + time + "</span>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "\n" +
        "                </div>"
}

function basicInfo() {

    $.ajax({
        url: "http://localhost:8080/user/id/" + uid,
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){
                let x = res.data;
                $(".top img").attr("src", x.avatar);
                $(".top h1").text(x.nickname);
                $(".top p").text(x.description);

                $uinfo = genInfo(x.gender, x.workPlace, x.lastLoginTime, x.rank)
            }
        }
    });

    $.ajax({
        url: "http://localhost:8080/post/number/id/" + uid,
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){
                $("#1").text(res.data.postSum);
                $("#3").text(res.data.commentSum);
                $("#2").text(res.data.questionSum);
            }
        }
    });

    $(".item-list").empty();

    //默认得到所有帖子
    if(sessionStorage.user){
        var user = JSON.parse(sessionStorage.user);
        if("" + user.id === uid) getMyPosts();
        else getPosts();
    } else {
        getPosts();
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

function getPosts() {
    $.ajax({
        url: "http://localhost:8080/post/user/" + uid + "/page/1/id",
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){
                $.each(res.data, function () {
                        $(".item-list").append(genPost(this.id, this.title, this.commentSum, this.favoriteSum, this.updateTime));
                })
            }
        }
    });
}

function getMyPosts() {
    $.ajax({
        url: "http://localhost:8080/post/user/" + uid + "/page/1/id",
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){
                $.each(res.data, function () {
                    $(".item-list").append(genMyPost(this.id, this.title, this.commentSum, this.favoriteSum, this.updateTime));
                })
            }
        }
    });
}