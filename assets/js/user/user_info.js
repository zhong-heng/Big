let form = layui.form;

function getUser() {
    $.ajax({
        url: "/my/userinfo",
        success: res => {
            // console.log(res);
            // 获取表单里面所有的值并将ajax获取到的值传进去
            form.val("formTest", //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                res.data // "name": "value"
            );
        }
    })
}
getUser()

// 重置
$("#user_reset").on("click", function (e) {
    e.preventDefault();
    // console.log(111);
    getUser()
})

// 修改
$(".layui-form").on("submit", function (e) {
    e.preventDefault();
    let data = $(".layui-form").serialize()
    console.log(data);
    $.ajax({
        url: "/my/userinfo",
        type: "post",
        data,
        success: (res) => {
            // console.log(res);
        }
    })
    // console.log(window.parent);
    window.parent.getAjax()
})

