$(function () {
    toggle();
});

function toggle() {

    var $lis = $(".tabs li");

    $lis.click(function () {
        $lis.removeClass("select");
        $(this).addClass("select");
    })
}

