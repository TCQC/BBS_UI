var id;
window.onload =
  function () {
    id = JSON.parse(this.sessionStorage.user).id;
    ajaxBlock(id);
    userTemplate();
  }

function
userTemplate() {
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
  $.each(data, function (index, item) {
    $('#block').append($('<option>').attr('value', item.id).append(item.name))
  });
}

function
addCategory() {
  var block_id = $('#block').val();
  var name = $('#name').val();
  var description = $('#description').val();

  $.ajax({
    url: 'http://localhost:8080/category',
    dataType: 'json',
    async: true,
    type: 'POST',
    data: {
      'name': name,
      'blockId': block_id,
      'description': description
    },
    success: function (result) {
      console.log(result.data);
      if (result.status) alert('添加分类成功');
    },
    error: function (xhr) {
      alert(xhr.status);
    }
  })
}

function
logout() {
  window.location.href = '../index.html';
}