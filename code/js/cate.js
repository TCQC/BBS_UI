$(function () {
    getCateInfo();
    sortTab();

});

//name:url中的变量值
function getRequest(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

function sortTab() {
    let $tabs = $(".main ul>li");
    $tabs.click(function () {
        $tabs.removeClass("sort");
        $(this).addClass("sort");
        getPosts(getRequest("cat"), this.id);
    })
}

function getCateInfo() {

    $.ajax({
        url: "http://localhost:8080/category/id/" + getRequest("cat"),
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){
                $(".title h2").text(res.data.name);
                $(".info a").attr("href", "block.html?id=" + res.data.block_id);
                $(".info a").text(res.data.block_name);
                $(".cate-info").text(res.data.description);
            }
        }
    });

    getPosts(getRequest("cat"), "updateTime");
}

function getPosts(id, sortType) {

    $(".post-list").empty();

    $.ajax({
        url: "http://localhost:8080/post/category/" + id + "/page/1/"+ sortType,
        method: "get",
        dataType: "json",
        success: function (res) {
            $.each(res.data, function () {
                let $post = genPost(this.id, this.avatar, this.title, this.status, this.nickname, this.userId, this.commentSum, this.favoriteSum, this.updateTime);
                $(".post-list").append($post);
            })
        }
    });
}

function genPost(id, img, title, status, nickname, uid, n1, n2, time) {


    var add = "";
    if (status === 2) {
        add = "<span class='am-badge am-badge-danger am-round'>置顶</span>";
    }
    if (status === 3) {
        add = "<span class='am-badge am-badge-danger am-round'>置顶</span>" +
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
        "                        • <span>" + n1 + "</span> 人回复\n" +
        "                        • <span>" + n2 + "</span> 个收藏\n" +
        "                        • 最后更新：<span>" + time + "</span>\n" +
        "                    </div>\n" +
        "                </div>");
}
