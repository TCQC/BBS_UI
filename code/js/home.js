$(function () {
    checkLogin();
    toggle();
});

function toggle() {

    let $lis = $(".tabs li");

    $lis.click(function () {
        $lis.removeClass("select");
        $(this).addClass("select");
    })
}

function checkLogin() {
    console.log(sessionStorage.user);
}

