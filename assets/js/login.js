$(function () {
    $("#showReg").on('click', function () {
        $('.rigist').show();
        $('.login').hide()
    })
    $('#showlog').on('click', function () {
        $('.rigist').hide();
        $('.login').show()
    })

    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        // username: function (value, item) { //value：表单的值、item：表单的DOM对象
        //     if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        //         return '用户名不能有特殊字符';
        //     }
        //     if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        //         return '用户名首尾不能出现下划线\'_\'';
        //     }
        //     if (/^\d+\d+\d$/.test(value)) {
        //         return '用户名不能全为数字';
        //     }

        //     //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
        //     if (value === 'xxx') {
        //         alert('用户名不能为敏感词');
        //         return true;
        //     }


        // },
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repassword: function (value) {
            var pwd1 = $('#pwd1').val()
            if (pwd1 !== value) {
                return '两次密码不一致！'
            }
        },


    });


    $('#rigistForm').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#showlog').click()
            }
        })

    })

    $("#loginForm").on('submit', function (e) {
        e.preventDefault()
        let data = $('#loginForm').serialize()
        $.ajax({
            type: 'POST',
            url: "/api/login",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                // 把 token (令牌) 存贮到本地存储中
                localStorage.setItem("token", res.token)

                layer.msg('登陆成功', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    location.href = '../../home/index.html'
                });
            }
        })
    })
})