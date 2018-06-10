$(function () {
    checkLogin();
});

function checkLogin() {

    //存在用户信息，说明已经登陆
    if(sessionStorage.user !== ""){
        $(".header-login").css({ display: "" });
        $(".header-unlogin").css({ display: "none" });
    } else {
        $(".header-login").css({ display: "none" });
        $(".header-unlogin").css({ display: "" });
    }
}