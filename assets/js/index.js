$(function () {
    getUserInfo()
    //监听退出事件
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否要退出', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
//获取用户个人数据
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })

}
//将数据头像渲染
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').html(text).show()
    }
}