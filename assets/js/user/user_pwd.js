

let form = layui.form;
let layer = layui.layer;

form.verify({
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    newPwd : function (value) {
        // console.log(value);
        if (value !== $("#repwd").val()) {
            return "请确认两次密码相同"
        }
    }
});
$("#pwd").on("submit", function (e) {
    e.preventDefault()
    let data = $("#pwd").serialize()
    // console.log(data);

    $.ajax({
        url: "/my/updatepwd",
        type: "POST",
        data,
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
           $("#pwd")[0].reset()
        }
    })
})