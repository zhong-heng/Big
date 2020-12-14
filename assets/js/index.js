getAjax()
let layer = layui.layer;
function getAjax() {

    $.ajax({
        url: "http://ajax.frontend.itheima.net/my/userinfo",
        headers: {
            // token 的值存储在本地存储中，需要从本地存储中来获取到
            // Authorization 这个不是随便写的，后端定义要求的
            Authorization: localStorage.getItem("token"),
          },
        success: (res) => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            let name = res.data.username || res.data.nickname
            $('.uname').text(name)
            console.log(name[0].toUpperCase());
            if (!res.data.user_pic) {
                $('.text').text(name[0].toUpperCase())
            } else {
                $('.text').hide()
                $('.layui-nav-img').show()
            }
        }
    })
}
