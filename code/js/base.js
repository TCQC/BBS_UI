$(function () {
    checkLogin();
    logOut();
});

//修改头部的信息
function checkLogin() {

    let $login = $(".header-login");
    let $unLogin = $(".header-unlogin");

    //存在用户信息，说明已经登陆
    if(typeof(sessionStorage.user) === "undefined"){
        $login.css({ display: "" });
        $unLogin.css({ display: "none" });
    } else {
        $login.css({ display: "none" });
        $unLogin.css({ display: "" });
    }
}

function logOut() {
    $("#logout").click(function () {
        sessionStorage.user = undefined;
    })
}