$(function () {
    checkLogin();
});

function checkLogin() {

    let $login = $(".header-login");
    let $unLogin = $(".header-unlogin");

    //存在用户信息，说明已经登陆
    if(sessionStorage.user !== ""){
        $login.css({ display: "" });
        $unLogin.css({ display: "none" });
    } else {
        $login.css({ display: "none" });
        $unLogin.css({ display: "" });
    }
}