$(function () {
    toggle();
    selectBlock();
});

function toggle() {
    $(".info").height($(".main").height() - 51);

    $(".t").css({ display: "" });
    $(".q").css({ display: "none" });
    $(".main .title li").click(function () {

        //tab shift
        $(".main .title li").removeClass("select");
        $(this).addClass("select");

        if($(this).text() === "文章"){
            $(".t").css({ display: "" });
            $(".q").css({ display: "none" });
        } else {
            $(".q").css({ display: "" });
            $(".t").css({ display: "none" });
        }

        $(".info").height($(".main").height());
    })
}

//$("#cat").append('<option value="o">' + '动态插入的选项 ' + '</option>');

function selectBlock() {
    $("#block").on("change", function () {
        if($(this).val() === "x"){

            var $cat = $("#cat");
            $cat.empty();
            $cat.append("<option value='x'>" + "请选择分类" + "</option>");
        } else {
            $.ajax({
                //请求对应分类的数据
                type: "get",
                url: "",
                dataType: "json",
                data: {"": $(this.val())},
            })
        }
    })


}


