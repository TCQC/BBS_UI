$(function () {

    $("#email, #pass").focus(restore);
    $("#email").blur(checkEmail);
    $("#pass").blur(checkPass);
    $("#submit").click(checkAll);
});

function checkEmail() {
    var flag;
    var email = $("#email").val();

    if(email === ""){
        setError("请输入邮箱！");
        flag = false;
    } else if (!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
        setError("请输入合法邮箱！");
        flag = false;
    } else {
        flag = true;
    }
    return flag;
}

//check whether pass is empty
function checkPass() {

    var flag = true;

    if($("#pass").val() === ""){
        flag = false;
        setError("请输入密码！");
    }
    return flag;
}

function checkAll() {

    if(!(checkEmail() && checkPass())){
        return false;
    } else {
        //ajax submit
        window.location.href = "index.html";
    }
}
//clear error info
function restore() {
    $(".err").text("");
}

//set error info
function setError(info) {
    $(".err").text(info);
}