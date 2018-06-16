$(function () {
    newMail();
});

function newMail() {
    $('#new-mail').on('click', function() {
        $('#add-mail').modal({
            relatedTarget: this,
            onConfirm: function(e) {
                let userName = e.data;
                $.ajax({

                });
            },
            onCancel: function() {
                $("#prompt").text("请输入用户名：");
            }
        });
    });
}