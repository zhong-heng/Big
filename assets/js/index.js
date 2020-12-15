getAjax()
let layer = layui.layer;
function getAjax() {

    $.ajax({
        url: "/my/userinfo",
        headers: {
            // token 的值存储在本地存储中，需要从本地存储中来获取到
            // Authorization 这个不是随便写的，后端定义要求的
            Authorization: localStorage.getItem("token"),
          },
        success: (res) => {
            console.log(res);
            if (res.status !== 0) {
                // return layer.msg(res.message);
                localStorage.removeItem("token");
                location.href = '../../home/login.html'
            }
            let name = res.data.username || res.data.nickname
            $('.uname').text(name)
            // console.log(name[0].toUpperCase());
            if (!res.data.user_pic) {
                $('.text').text(name[0].toUpperCase())
                $('.layui-nav-img').hide()

            } else {
                $('.text').hide()
                $('.layui-nav-img').attr('src', res.data.user_pic).show()
            }
        }
    })
}
// 退出
$("#out").on("click", function () {
    // console.log(111);
    layer.confirm('请确认退出', {icon: 3, title:'提示'}, function(index){
        //do something
        
        layer.close(index);
        // 删除本地存储的token
        localStorage.removeItem("token")
        location.href= "../../home/login.html"
      });
})
