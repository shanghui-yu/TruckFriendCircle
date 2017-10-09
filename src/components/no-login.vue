<template>
  <div class="no-login">
      <image style="" src="https://s.kcimg.cn/test/trucknew/images/no-login.png" class="no-login-bg"></image>
      <text class="login-text">登陆后</text>
      <text class="login-text-remind">才能看到您关注的卡友动态哦</text>
      <text class="login-button" @click="tologin">立即登录</text>
  </div>
</template>

<style scoped>
    .no-login{
      justify-content: center;
      align-items: center;
      flex:1;
    }
    .no-login-bg{
      width: 400px;
      height: 280px;
      margin-top: 140px;
    }
    .login-text{
      font-size: 36px;
      color: #666666;
      line-height: 56px;
      text-align: center;
    }
    .login-text-remind{
      font-size: 28px;
      color: #999;
      line-height: 44px;
      text-align: center;
    }
    .login-button{
      background-color: #1571E5;
      border-top-left-radius:5px;
      border-top-right-radius:5px;
      border-bottom-left-radius:5px;
      border-bottom-right-radius:5px;
      margin-top: 100px;
      margin-right: auto;
      margin-left: auto;
      width: 300px;height: 90px;
      text-align: center;
      color: #fff;
      line-height: 90px;
    }
</style>

<script>
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    data () {
      return {
      }
    },
    methods: {
      tologin(){
        weex.requireModule('THAW').onGoLogin();
         var _this=this
         globalEvent.addEventListener('onGoLoginCallBack',function(res){
              if (res.status=='1') {
                storage.setItem('uid',res.userId)
                storage.setItem('version',res.versionCode)
                _this.getUser(res.userId)
              }
          })
      },
      getUser(uid){
         var _this=this
         XHR.getHis({"uid":uid}).then( function (res) {
          var userData=res.data.user
              storage.setItem('avatar',userData.avatar)
              _this.$store.dispatch('GET_HIS',{uid:`${uid}`,avatar:`${userData.avatar}`})
          })
      }
    }
  }
</script>
