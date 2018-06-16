var curPage = 1;
var user;
window.onload = function () {
  user = JSON.parse(this.sessionStorage.user);
  var id = user.id;
  console.log(user);
  ajaxBlock(id);
  userTemplate();
}

function userTemplate() {
  document.getElementById('nickname').textContent = user.nickname;
  document.getElementById('nickname2').textContent = user.nickname;
  $('#avatar').attr('src', user.avatar)
}

function ajaxPosts(block) {
  if (block == null) {
    block = 0;
  }
  $.ajax({
    url: 'http://localhost:8080/post/block/' + block + '/page/1/id',
    type: 'GET',
    async: true,
    data: 'json',
    success: function (result) {
      console.log(result.data);
      postTemplate(result.data);
    },
    error: function (xhr) {
      alert(xhr);
    }
  })
}

/**
 * 使用数据显示user
 * @param  data
 */
function postTemplate(data) {
  var userlist = data;
  $('#posts').html('')
  var s0, s1, s2, s3, s4;
  $.each(userlist, function (index, item) {
    if (item.status == 0) {
      s0 = true;
      s1 = false;
      s2 = false;
      s3 = false;
      s4 = false;
    } else if (item.status == 1) {
      s0 = false;
      s1 = true;
      s2 = false;
      s3 = false;
      s4 = false;
    } else if (item.status == 2) {
      s0 = false;
      s1 = false;
      s2 = true;
      s3 = false;
      s4 = false;
    } else if (item.status == 3) {
      s0 = false;
      s1 = false;
      s2 = false;
      s3 = true;
      s4 = false;
    } else if (item.status == 4) {
      s0 = false;
      s1 = false;
      s2 = false;
      s3 = false;
      s4 = true;
    }

    $('#posts').append($('<tr>').append(
      $('<td>').append(item.id), $('<td>').append(item.title),
      $('<td>').append(item.nickname),
      $('<td>').append(item.updateTime),
      $('<td>').append($('<select>')
        .attr('id', item.id)
        .attr('class', 'status')
        .attr('data-am-selected', '{searchBox: 1}')
        .attr('value', item.status)
        // .attr('style', 'display: none')
        .append(
          $('<option>')
          .attr('value', '0')
          .attr('selected', s0)
          .append('隐藏'),
          $('<option>')
          .attr('value', '1')
          .attr('selected', s1)
          .append('普通'),
          $('<option>')
          .attr('value', '2')
          .attr('selected', s2)
          .append('加精'),
          $('<option>')
          .attr('value', '3')
          .attr('selected', s3)
          .append('置顶'),
          $('<option>')
          .attr('value', '4')
          .attr('selected', s4)
          .append('置顶并加精')))))
  })
  $.each($('.status'), function (index, item) {
    var id = '#' + item.id;

    $(id).change(function () {
      console.log(item.id);
      console.log($(id).val());
      changeStatus(item.id, $(id).val());
    })
  })
}

function changeStatus(id, status) {
  $.ajax({
    url: 'http://localhost:8080/admin/post/id/' + id + '/status/' + status,
    type: 'PUT',
    async: true,
    data: 'json',
    success: function (result) {
      // refreshPage(curPage);
      alert('修改状态成功');
    },
    error: function (xhr) {
      alert(xhr);
    }
  })
}

function ajaxBlock(id) {
  $.ajax({
    url: 'http://localhost:8080/block/admin/' + id,
    dataType: 'json',
    async: true,
    type: 'get',
    success: function (result) {
      if (result.status)
        blockTemplate(result.data);
    },
    error: function (xhr) {
      alert(xhr.status);
    }
  })
}

function blockTemplate(data) {
  $('#block').html('');
  $.each(data, function (index, item) {
    $('#block').append($('<option>').attr('value', item.id).append(item.name))
  });
  $('#block').change(function () {
    ajaxPosts($('#block').val());
  })
}

function
logout() {
  window.location.href = '../index.html';
}