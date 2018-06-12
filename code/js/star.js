$(function () {
    toggle();
    addFolder();
});

function toggle() {

    //事件委托，将li的监听转到其他元素
    $(".star").delegate(".folder", "click", function () {
        let $lis = $(".folder");
        $lis.removeClass("select");
        $(this).addClass("select");
        //todo ajax获得数据，进行页面异步刷新
    });
}

function addFolder() {
    $('#add').on('click', function() {
        $('#add-folder').modal({
            relatedTarget: this,
            onConfirm: function(e) {

                let $newli = $("<li class='folder'>"+ e.data + "</li>");
                $(".star ul").append($newli);
            },
            onCancel: function() {
            }
        });
    });
}