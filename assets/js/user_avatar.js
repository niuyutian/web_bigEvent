var form =layui.form;
var layer =layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  $('#btnChooseImage').on('click',function(){
    $('#file').click()
  })
  $('#file').on('change',function(e){
    var fileList =e.target.files
    if(fileList.length === 0){
      return layer.msg('请选择照片!')
    }
    var file =e.target.files[0]
    //将文件转换为路径
    var imgURL =URL.createObjectURL(file)
    $image
    .cropper('destroy')//销毁旧的裁剪区域
    .attr('src',imgURL) //重新设置图片路径
    .cropper(options) //重新初始化裁剪区域
  })
  //确定上传男绑定点击事件
  $('#btn_upload').on('click',function(){
          // 1. 要拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2. 调用接口，把头像上传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })
  })