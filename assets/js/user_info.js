var form =layui.form;
var layer =layui.layer;
$(function(){
    getUserInfo()
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return "昵称长度必须在1~6个字符之间"
            }
        }
    })
    $("#btnReset").on('click',function(e){
        e.preventDefault();
        getUserInfo();
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        // 发ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg("更新用户信息失败")
                }
                layer.msg("更新用户信息成功!")
                window.parent.getUserInfo()
            }
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
           form.val('formUserInfo',res.data) 
        },
    })
}