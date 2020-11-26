$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '请输入1~6个字符'
            }
        }
    })
    //获取用户信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败！')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    //监听修改按钮
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改信息失败！')
                }
                layer.msg('修改信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
    //监听重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
})