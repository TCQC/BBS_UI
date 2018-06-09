$(function () {
    adjustHeight();
});

function adjustHeight() {
    if($(".info").height() + 40 < $(".main").height())
        $(".info").height($(".main").height() - 40);
}