
var key = getRequest("key");
$(function () {
    //展示搜索到的帖子
    showRes();

    //展示推荐帖子
    getHot();
});

function getRequest(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let url = encodeURI(window.location.search);
    let r = url.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return decodeURI(unescape(r[2])); return null; //返回参数值
}

function genPost(id, img, title, status, nickname, uid, n1, n2, time) {


    var add = "";
    if(status === 2){
        add = "<span class='am-badge am-badge-success am-round'>精</span>";
    }
    if(status === 3){
        add = "<span class='am-badge am-badge-danger am-round'>置顶</span>";
    }
    if(status === 4){
        add = "<span class='am-badge am-badge-danger am-round'>置顶</span>&nbsp;&nbsp;" +
            "<span class='am-badge am-badge-success am-round'>精</span>";
    }

    return $("<div class=post>\n" +
        "                    <a href=home.html?id=" + uid + ">\n" +
        "                        <img src=" + img + ">" +
        "                    </a>\n" +
        "                    <div class=content>\n" +
        "                        <h4>\n" +
        "                            <a href=post.html?id=" + id + ">" + title + "</a>&nbsp;&nbsp;\n" +
        add +
        "                        </h4>\n" +
        "                    </div>\n" +
        "                    <div class=description>\n" +
        "                        <span class=user><a href=home.html?id=" + uid + ">" + nickname + "</a></span> 发布了贴子\n" +
        "                        • <span>" + n1 +"</span> 人评论\n" +
        "                        • <span>" + n2 +"</span> 个收藏\n" +
        "                        • 最后更新：<span>" + time + "</span>\n" +
        "                    </div>\n" +
        "                </div>");
}

function showRes() {
    //todo ajax请求，得到所有的相关帖子
    $.ajax({
        url: "http://localhost:8080/post?keyword=" + key,
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){
                $(".post-list").empty();
                $.each(res.data, function () {
                    let $post = genPost(this.id, this.avatar, this.title, this.status, this.nickname, this.userId, this.commentSum, this.favoriteSum, this.updateTime);
                    $(".post-list").append($post);
                })
            }
        },
        error: function (x) {
            console.log(x.status);
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