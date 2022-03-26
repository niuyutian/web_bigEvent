var form =layui.form;
var layer =layui.layer;
$(function(){
    form.verify({
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return "新旧密码不能相同!"
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return "两次密码不一致!"
            }
        }
    })
    $("#btnReset").on('click',function(e){
        e.preventDefault();
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        // 发ajax请求
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg("更新用户密码失败")
                }
                layer.msg("更新用户密码成功!")
                $('.layui-form')[0].reset()
            }
        })
    })
})