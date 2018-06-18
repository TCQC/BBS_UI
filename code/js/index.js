$(function () {
    checkLogin();
    logOut();
    getBlockInfo();
    home();
    search();

});

function checkLogin() {
    let $login = $('.header-login');
    let $unLogin = $('.header-unlogin');

    //存在用户信息，说明已经登陆
    if (sessionStorage.user) {
        $login.css({
            display: ''
        });
        $unLogin.css({
            display: 'none'
        });
        addTou();
        checkAdmin();
    } else {
        $login.css({
            display: 'none'
        });
        $unLogin.css({
            display: ''
        });
    }
}

function getBlockInfo() {
    $.ajax({
        url: 'http://localhost:8080/block',
        method: 'get',
        dataType: 'json',
        success: function (res) {
            if (res.status) {
                $.each(res.data, function () {
                    let $item = genBlock(
                        this.id, this.name, this.icon, this.categorySum, this.postSum,
                        this.updateTime, this.adminName, this.adminId);
                    $('.module').append($item);
                });
            }
        }
    });
}

// todo 版块头像未更新，版主信息未加载，版主主页待设置
function genBlock(id, name, imgLoc, catN, postN, time, admin, uid) {
    return $(
        '<div class=item>' +
        '<a href=html/block.html?id=' + id + '>' +
        '<img src=' + imgLoc + '>' +
        '</a>' +
        '<span><a href=html/block.html?id=' + id + '>' + name + '</a></span>' +
        '<p>共有<span>' + catN + '</span>个分类，<span>' + postN +
        '</span>个帖子 &nbsp;版主：<a class=block-admin href=html/home.html?id=' +
        uid + '>' + admin + '</a></p>' +
        '<p>上次更新 <span>' + time + '</span></p>\n' +
        '</div>');
}

function logOut() {
    $('#logout').click(function () {
        sessionStorage.clear();
    })
}

function addTou() {
    let user = JSON.parse(sessionStorage.user);
    $('#usr-avt').attr('src', user.avatar);
}

function home() {
    $("#user ul li:first a").on("click", function () {
        let uid = JSON.parse(sessionStorage.user).id;
        window.location.href = "html/home.html?id=" + uid;
        return false;
    });
}

function checkAdmin() {
    let status = JSON.parse(sessionStorage.user).status;
    console.log(sessionStorage.user);

    if(status !== 2){
        $(".admin").css({display: "none"});
    } else {
        $(".admin").css({display: ""});
    }
}

function search() {
    $(".am-icon-search").on("click", function () {
        let keyword = $(this).parent(".search").children("input").val();
        if(keyword.trim()) window.location.href = "html/search.html?key=" + keyword;
    })
}