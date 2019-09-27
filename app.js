//app.js
App({
  onLaunch: function() { //全局只触发一次
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [] //获取本地缓存中的logs属性，如果值为空，那么设置logs=[] 与HTML5中的localStorage作用相似
    logs.unshift(Date.now()) //当前登录时间添加到数组中
    wx.setStorageSync('logs', logs) //将数据存入本地缓存，因为wx为全局对象，所以可以在其他文件中直接wx.getStorageSync('logs')获取本地缓存数据

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})