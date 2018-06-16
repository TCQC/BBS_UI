$(function () {
    checkLogin();
    logOut();
    home();
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