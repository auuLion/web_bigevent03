$(function () {
    $('#link_reg').on('click', function () {
        $('.login').hide()
        $('.reg').show()
    })
    $('#link_login').on('click', function () {
        $('.login').show()
        $('.reg').hide()
    })
    //对表单进行验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#form_reg input[name=password]').val()
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }
    })
    //监听注册事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg input[name=username]').val(),
                password: $('#form_reg input[name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#form_reg')[0].reset()
                $('#link_login').click()
            }
        })
    })
    //监听登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})