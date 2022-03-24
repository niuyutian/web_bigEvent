$(function(){
    getUserInfo()
    var layer=layui.layer
    $("#btn_exit").on('click',function(){
        layer.confirm("确定退出登录?",{icon:3,title:'提示'},function(){
            localStorage.removeItem("token")
            location.href="/login.html"
        })
    })
})
// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !==0){
                return layer.msg('获取用户信息失败!')
            }
            renderAvatar(res.data)
        },
    })
}
//渲染用户头像
function renderAvatar(user){
    var name =user.nickname ||user.username
    // 渲染欢迎语
    $('#welcome').html("欢迎&nbsp;"+name)
    // 头像
    if(user.user_pic !=null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}