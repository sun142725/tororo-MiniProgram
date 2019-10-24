import * as TIM from './utils/tim-wx.js'
const tim = TIM.create({
  SDKAppID: 1400164159
})
wx.$apptim = tim
import store from './store.js'
import imOperator from './pages/consulting/js/imOperator.js'
import { getLoginInfo2 } from './pages/consulting/js/api.js'
imOperator.initListener()
getLoginInfo2({})
  .then(res=>{
    // console.log(res)
    let promise = tim.login({
      userID: res.data.userID, userSig: res.data.userSig})
    promise.then(function (imResponse) {
      console.log('imResponse.data', imResponse.data) // 登录成功
    }).catch(function (imError) {
      console.warn('login error:', imError) // 登录失败的相关信息
    })
  })
console.log('app.js')
const app = getApp();
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('res', res)
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
    wx.getSystemInfo({
      success: function (res) {
        //model中包含着设备信息
        console.log('res.model', res)
        var model = res.model
        // if (model.search('iPhone X') != -1) {
        //   app.globalData.isIpx = true;
        // } else {
        //   app.globalData.isIpx = false;
        // }
      }
    })
  },
  globalData: {
    userInfo: null,
    isIpx: false
  }
})