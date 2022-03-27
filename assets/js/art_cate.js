$(function(){
var layer =layui.layer
var form =layui.form

var indexAdd=null
    initArtCateList()

    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var htmlStr= template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    } 
    $('#btnAddCate').on('click',function(){
        indexAdd=layer.open({
            type:1,
            area:['500px','250px'],
            title:"添加文章分类",
            content:$('#dialog-add').html()
        })
    })
    //注意如果使用绑定事件绑定时候,元素还没有在页面产生则会出现,绑定失败的情况,可以使用代理的形式绑定
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    layer.msg('新增分类失败!')
                    return
                }
                initArtCateList()
                layer.close(indexAdd)
                layer.msg('新增分类成功!')
            }
        })
    })

    $('tbody').on('click','#btn-edit',function(){
        indexAdd=layer.open({
            type:1,
            area:['500px','250px'],
            title:"修改文章分类",
            content:$('#dialog-edit').html()
        })
        var id =$(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                form.val('form-edit',res.data)
            }
        })
    })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status !==0){
                    layer.msg("更新分类数据失败")
                    return
                }
                initArtCateList()
                layer.close(indexAdd)
                layer.msg("更新分类数据成功")
                return

            }
        })

    })
    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
            if (res.status !== 0) {
                return layer.msg('删除分类失败！')
            }
            layer.msg('删除分类成功！')
            layer.close(index)
            initArtCateList()
            }
        })
        })
    })
})