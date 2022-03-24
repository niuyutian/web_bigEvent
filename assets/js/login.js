$(function(){
    $('#goto_reg').on('click',function(){
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('#goto_login').on('click',function(){
        $('.regBox').hide()
        $('.loginBox').show()
    })
    //从layui中获取form对象
    var form =layui.form
    const layer=layui.layer
    // 通过form.verify自定义校验规则
    form.verify({
        'pwd':[/^[\S]{6,12}$/,
        '密码必须6-12位不能出现空格'],
        'repwd':function(value){
            let pwd=$('.regBox [name=password]').val()
            if(pwd !==value){
                return "两次密码不一致"
            }
        }
    })
    //注册表单提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        const data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,
        function(res){
            if(res.status!==0){
                return layer.msg("注册失败"+res.message);
            }
            layer.msg("注册成功,请登录!");
            $('#goto_login').click()
        })
    })
    //登录表单提交事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            data: $(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status !==0){
                    return layer.msg('登录失败!')
                }
                localStorage.setItem('token',res.token)
                console.log(res.token);
                layer.msg('登录成功!')
                location.href= '/index.html'
            }
        })
    })
})

