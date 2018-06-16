var id;
window.onload =
  function () {
    id = JSON.parse(this.sessionStorage.user).id;
    ajaxBlock(id);
    ajaxCategories(-1);
    userTemplate();
  }

$(document)
  .ready(function () {
    $('#block').change(function () {
      ajaxCategories($('#block').val());
    })
  })

function userTemplate() {
  var user = JSON.parse(sessionStorage.getItem('user'));
  document.getElementById('nickname').textContent = user.nickname;
  document.getElementById('nickname2').textContent = user.nickname;
  $('#avatar').attr('src', user.avatar)
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
  // $('#block').append($('<option>').attr('value', -1).append('全部分类'))
  $.each(data, function (index, item) {
    $('#block').append($('<option>').attr('value', item.id).append(item.name))
  });
}

function ajaxCategories(id) {
  var url;
  if (id == null) {
    id = 0;
  }
  url = 'http://localhost:8080/category/block/' + id;
  console.log(url);
  $.ajax({
    url: url,
    type: 'GET',
    async: true,
    data: 'json',
    success: function (result) {
      console.log(result.data);
      categoryTemplate(result.data);
    },
    error: function (xhr) {
      alert(xhr);
    }
  })
}


function categoryTemplate(data) {
  $('#datas').html('');
  $.each(data, function (index, item) {
    $('#datas').append($('<tr>').append(
      $('<td>').append(item.id), $('<td>').append(item.name),
      $('<td>').append(item.description),
      $('<td>').append(
        $('<div>')
        .attr('class', 'tpl-table-black-operation')
        .append($('<a>')
          .attr('href', '')
          .attr('class', 'tpl-table-black-operation-del')
          .attr('onclick', 'del(' + item.id + ')')
          .append($('<i>')
            .attr('class', 'am-icon-trash')
            .append('删除'))))))
  });
}



function addCategory() {
  var block_id = $('#block').val();
  console.log(block_id);
}

function addPage() {
  window.location.href = './category-add.html';
}

function del(id) {
  console.log('del' + id);
  $.ajax({
    url: 'http://localhost:8080/category/id/' + id,
    type: 'DELETE',
    async: true,
    data: 'json',
    success: function (result) {
      if (result.status) {
        ajaxCategories($('#block').val())
      }
    },
    error: function (xhr) {
      alert(xhr);
    }
  })
}

function logout() {
  window.location.href = '../index.html';
}