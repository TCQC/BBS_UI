$(function () {
    newMail();
});

function newMail() {
    $('#new-mail').on('click', function() {
        $('#add-mail').modal({
            relatedTarget: this,
            onConfirm: function(e) {

            },
            onCancel: function() {
            }
        });
    });
}