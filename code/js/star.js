//todo get id from sessionstorage
var id;
var select = -1;
$(function () {
    id = JSON.parse(sessionStorage.user).id;
    toggle();
    addFolder();
    getUserFavorite(id);
    getHot();
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
    $('#add').on('click', function () {
        $('#add-folder').modal({
            relatedTarget: this,
            onConfirm: function (e) {
                //todo add folder
                let $newli = $("<li class='folder'>" + e.data + "</li>");
                $(".star ul").append($newli);
            },
            onCancel: function () {}
        });
    });
}

function getUserFavorite(id) {
    $.ajax({
        url: 'http://localhost:8080/favorite/user/' + id,
        dataType: 'json',
        async: true,
        type: 'get',
        success: function (result) {
            if (result.status)
                updateFavorites(result.data);
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    })
}

function updateFavorites(data) {
    $('#favorites').html('');
    $.each(data, function (index, item) {
        $('#favorites').append(
            $('<li>')
            .attr('id', item.id)
            .attr('class', 'folder')
            .attr('onclick', 'getStar(' + item.id + ')')
            .append(item.name)
        )
    });
    if (select === -1) {
        select = data[0].id;
    }
    $('#' + select).attr('class', 'select folder');
    getStar(select);
}

/**
 * 获取收藏夹下的收藏列表
 * @param {} id 
 */
function getStar(starId) {
    select = starId;
    $.ajax({
        url: 'http://localhost:8080/post/favorite/' + starId + '/page/1/id',
        dataType: 'json',
        async: true,
        type: 'get',
        success: function (result) {
            if (result.status) {
                updateStar(result.data);
            }
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    })
}

function updateStar(data) {
    $('#star').html('');
    $.each(data, function (index, item) {
        $('#star').append(
            $('<div>')
            .attr('class', 'post-item')
            .append(
                $('<h4>')
                .append(
                    $('<a>')
                    .attr('href', 'post.html?id=' + item.id)
                    .append(item.title)
                ),
                $('<p>')
                .append(
                    $('<span>')
                    .append(item.commentSum),
                    $('<span>')
                    .append(' 次评论 •  '),
                    $('<span>')
                    .append(item.favoriteSum),
                    $('<span>')
                    .append(' 收藏 •   '),
                    $('<span>')
                    .append('最后更新：'),
                    $('<span>')
                    .append(item.updateTime)
                )
            )
        )
    })
}

function addFavorite() {
    $.ajax({
        url: 'http://localhost:8080/favorite',
        dataType: 'json',
        async: true,
        type: 'post',
        data: {
            'id': id,
            'name': $('#input-favorite').val()
        },
        success: function (result) {
            console.log(result);
            getUserFavorite(id);
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    })
}

function getHot() {
    $.ajax({
        url: 'http://localhost:8080/post/hot',
        dataType: 'json',
        async: true,
        type: 'get',
        success: function (result) {
            if (result.status) {
                updateHot(result.data);
            }
        },
        error: function (xhr) {
            alert(xhr.status);
        }
    })
}

function updateHot(data) {
    $('#hot').html('');
    $.each(data, function (index, item) {
        $('#hot').append(
            $('<li>')
            .attr('class', 'folder')
            .append(
                $('<a>')
                .attr('href', 'post.html?id=' + item.id)
                .append(item.title)
            )
        )
    })
}