var id;
var avatar;
$(function () {
    checkLogin();
    var user = JSON.parse(sessionStorage.user);
    id = user.id;
    console.log(id);
    avatar = user.avatar;
    updateInfo(user);

});
$(document).ready(function () {
    $('#avatar').change(function () {
        var file = $('#avatar')[0].files[0];
        upload(file);
    })
});



function updateInfo(user) {
    $('#nickname').html(user.nickname);
    updateGender(user.gender);
    $('#input-show').val(user.description);
    $('#input-work').val(user.workPlace);
    $('#preview').attr('src', user.avatar);
}

/**
 * 更新gender信息
 */
function updateGender(gender) {
    if (gender == '男') {
        $('#gender0').attr('checked', false);
        $('#gender1').attr('checked', true);
        $('#gender2').attr('checked', false);
    } else if (gender == '女') {
        $('#gender0').attr('checked', false);
        $('#gender1').attr('checked', false);
        $('#gender2').attr('checked', true);
    } else if (gender == '保密') {
        $('#gender0').attr('checked', true);
        $('#gender1').attr('checked', false);
        $('#gender2').attr('checked', false);
    }
}

function upload(file) {
    var objUrl = getObjectURL(file);
    $('#preview').attr('src', objUrl);
    var form = new FormData();
    form.append('name', id);
    form.append('file', file);
    $.ajax({
        url: 'http://localhost:8080/upload/avatar',
        dataType: 'json',
        async: true,
        processData: false,
        contentType: false,
        type: 'POST',
        data: form,
        success: function (result) {
            console.log(result.data);
            if (result.status) {
                avatar = result.data;
            }
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    })
}

function getObjectURL(file) {
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function update() {
    $.ajax({
        url: "http://localhost:8080/user",
        dataType: "json",
        async: true,
        type: "put",
        data: {
            'id': id,
            'avatar': avatar,
            'gender': $("input[name='docInlineRadio'][checked]").val(),
            'workPlace': $('#input-work').val(),
            'description': $('#input-show').val()
        },
        success: function (res) {
            if (res.status) {
                sessionStorage.user = JSON.stringify(res.data);

                $("#my-alert").modal({});
            }
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}