$(function () {
    let layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 点击上传按钮
  $("#chooseBtn").on("click", function () {
    // 模拟点击按钮
    $("[type=file]").click();
  });

  // 给文件域注册change 事件--> 当文件域发生改变是触发事件 ==>  更换下裁切的图片

  $("#file").change(function () {
    //   console.log('文件域发生改变');
    // 获取到选择的图片===> 通过文件域的DOM对象的files的属性
    // console.log(this.files[0]);
    let file = this.files[0];
    let newImgUrl = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
    
    // 给确定按钮注册点击事件发送ajax
    $("#true").on('click',function () {
        var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  
        
        // console.log(dataURL);

        $.ajax({
            url: '/my/update/avatar',
            type : "POST",
            data: {
                avatar : dataURL,
            },
            // headers: {
            //     Authorization: localStorage.getItem("token")
            // },
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return  layer.msg("更换失败")
                }
                //调用父页面的方法来获取最新的头像和名称
                window.parent.getAjax()
            }
        })
    })
    
});
