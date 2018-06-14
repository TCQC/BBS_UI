$(function () {
    getBlockInfo();
    sortTab();
});

//name:url中的变量值
function getRequest(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

//请求加载所有的版块信息
function getBlockInfo() {

    let id = getRequest("id");

    $.ajax({
        url: "http://localhost:8080/block/id/" + id,
        method: "get",
        dataType: "json",
        success: function (res) {
            if(res.status){
                //添加所有的分类信息
                $.each(res.data.categories, function () {
                    let $li = genCat(this.id, this.name);
                    $(".cate ul").append($li);
                });

                //添加版块其他信息
                $(".block-info").text(res.data.description);
                $(".icon img").attr("src", res.data.icon);

                //加载版主信息
                $.ajax({
                    url: "http://localhost:8080/user/id/" + res.data.adminUserId,
                    method: "get",
                    dataType: "json",
                    success: function (res) {
                        if(res.status){
                            $(".adm a").attr("href", "home.html?id=" + res.data.id);
                            $(".adm p").text(res.data.nickname);
                            $(".adm img").attr("src", res.data.avatar);
                        }
                    }
                });
            }
        }
    });
    //得到所有的帖子
    getPosts(id, "updateTime");
}

function genCat(id, name) {
    return $("<li>\n" +
        "<a href=cate.html?cat=" + id + " target=_blank>" + name + "</a>\n" +
        "</li>");
}

function sortTab() {
    let $tabs = $(".title li");
    $tabs.click(function () {
        $tabs.removeClass("sort");
        $(this).addClass("sort");
        //根据选择的方式进行排序
        getPosts(getRequest("id"), this.id);
    })
}

function getPosts(id, sortType) {

    $(".post-list").empty();

    $.ajax({
        url: "http://localhost:8080/post/block/" + id + "/page/1/"+ sortType,
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