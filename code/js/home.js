$(function () {
    toggle();
});

function toggle() {

    let $lis = $(".tabs li");

    $lis.click(function () {
        $lis.removeClass("select");
        $(this).addClass("select");

        var type = $(this).attr("id");

        if(type === "post"){
            $(".item-list").empty();


        } else if (type === "ask"){
            $(".item-list").empty();

        } else if (type === "cmt"){
            $(".item-list").empty();

        } else {  //absolutely it is info

        }
    });
}


function genPost(pid, title, nc, ns, time) {
    return "<div class=post-item>\n" +
        "                        <h4>\n" +
        "                            <a href=post.html?id=" + pid + ">" + title + "</a>\n" +
        "                        </h4>\n" +
        "                        <p>\n" +
        "                            <span>" + nc + "</span>次评论 •\n" +
        "                            <span>" + ns +"</span> 个收藏 •\n" +
        "                            <span>" + time + "</span>\n" +
        "                        </p>\n" +
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

function genInfo(gender, email, place, time) {
    return "<div class=info-item>\n" +
        "                        <div class=gender>\n" +
        "                            性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：\n" +
        "                            <span>" +  gender +"</span>\n" +
        "                        </div>\n" +
        "                        <div class=email>\n" +
        "                            个人邮箱：\n" +
        "                            <span>" + email + "</span>\n" +
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