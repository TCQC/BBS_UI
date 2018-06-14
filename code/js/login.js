$(function () {

    $("#email, #pass").focus(restore);
    $("#email").blur(checkEmail);
    $("#pass").blur(checkPass);
    $("#submit").click(checkAll);
});

function checkEmail() {
    let flag;
    let email = $("#email").val();

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

    let flag = true;

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
        let email = $("#email").val();
        let pass = $("#pass").val();

        $.ajax({
            url: "http://localhost:8080/user/login",
            dataType: "json",
            async: true,
            type: "post",
            data: {
                "username": email,
                "password": pass
            },
            success: function (res) {

                if(res.status){
                    sessionStorage.user = JSON.stringify(res.data);
                    window.location.href = "../index.html";
                } else {
                    setError(res.message);
                }
            }
        });
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
