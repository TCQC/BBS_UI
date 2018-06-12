$(function () {
    toggle();
});

function toggle() {
    let $lis = $(".star li");
    $lis.click(function () {
        $lis.removeClass("select");
        $(this).addClass("select");
    })
}