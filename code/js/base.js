$(function () {
    checkLogin();
    logOut();
    //已登录用户访问自己的主页
    home();
    
    //全页面的搜索功能
    search();
    
});

//修改头部的信息
function checkLogin() {

    let $login = $(".header-login");
    let $unLogin = $(".header-unlogin");

    //存在用户信息，说明已经登陆
    if(sessionStorage.user){
        $login.css({ display: "" });
        $unLogin.css({ display: "none" });
        addTou();
        checkAdmin();
    } else {
        $login.css({ display: "none" });
        $unLogin.css({ display: "" });
    }
}

function logOut() {
    $("#logout").click(function () {
        sessionStorage.clear();
    })
}

function addTou() {
    let user = JSON.parse(sessionStorage.user);
    $("#usr-avt").attr("src", user.avatar);
}

function home() {
    $("#user ul li:first a").on("click", function () {
        let uid = JSON.parse(sessionStorage.user).id;
        window.location.href = "home.html?id=" + uid;
        return false;
    });
}

function checkAdmin() {
    let status = JSON.parse(sessionStorage.user).status;

    if(status !== 2){
        $(".admin").css({display: "none"});
    } else {
        $(".admin").css({display: ""});
    }
}

function search() {
    $(".am-icon-search").on("click", function () {
        let keyword = $(this).parent(".search").children("input").val();
        if(keyword.trim()) window.location.href = "search.html?key=" + keyword;
    })
}