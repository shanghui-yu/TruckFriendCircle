<template>
<div>
    <div class="main-header">
        <div class="avatar-wrap">
          <div class="avater-box" @click="toUser">
            <image :src="header.avatar" class="avatar" resize="cover" placeholder="https://s.kcimg.cn/test/trucknew/images/avater.png" @load="onload"></image>
          </div>
          <image v-if="header.certification=='blue'" src="https://s.kcimg.cn/test/trucknew/images/blue-grade.png" class="addV"></image>
          <image v-if="header.certification=='yellow'" src="https://s.kcimg.cn/test/trucknew/images/orange-grade.png" class="addV"></image>
        </div>
        <div class="user-information">
            <div style="flex-direction: row;">
              <text class="name">{{header.log_username}}</text>
              <image class="grade" :src="'https://s.kcimg.cn/test/trucknew/images/greade'+header.userlevel+'.png'"></image>
              <div v-for="(item ,index) in header.medalid">
                  <image class="rich" src="https://s.kcimg.cn/m/images/bbs/wechat/user/rich.png" v-if="item=='29'") > -1"></image>
                  <image class="first-rich" src="https://s.kcimg.cn/m/images/bbs/wechat/user/rich-first.png" v-if="item=='30'"></image>
                  <div class="old-driver" v-if="item=='31'">
                    <image :src="header.avatar" class="old-driver-avatar"></image>
                    <image src="https://s.kcimg.cn/m/images/bbs/wechat/user/driver.png" class="old-driver-bg"></image>
                  </div>
              </div>
            </div>
            <div><text class="time">{{uptime}}</text></div>
        </div>
        <div @click="change(header,index,discuss)" class="manage-wrap" v-if="source!='detail'">
          <text class="manage">&#xe6d2;</text>
        </div>
    </div>
</div>
</template>
<style scoped>
.main-header{flex-direction: row;justify-content: center;align-items: center;}
.user-information{font-size:32px;flex: 1}
.name{color:#2062A9;line-height:48px;font-size:30px;}
.avatar-wrap{margin-right: 20px;position: relative;}
.avater-box{
  width:72px;height:72px;
}
.avatar{
  width:72px;height:72px;
  border-bottom-left-radius:36px;
  border-bottom-right-radius:36px;
  border-top-left-radius:36px;
  border-top-right-radius:36px;
}
.addV{position:absolute;bottom:0;right:0;width:24px;height:24px;}
.grade{width:60px;height:30px;margin-top:7px;margin-left:10px;}
.rich{width:30px;height:30px;margin-top:9px;margin-left:10px;}
.first-rich{width:36px;height:30px;margin-top:9px;margin-left:10px;}
.old-driver{width:44px;height:30px;margin-top:9px;margin-left:10px;position:relative;}
.old-driver-avatar{width:30px;height:30px;
  border-bottom-left-radius:15px;
  border-bottom-right-radius:15px;
  border-top-left-radius:15px;
  border-top-right-radius:15px;position:absolute;left:7px;}
.old-driver-bg{position:absolute;z-index:2;bottom:-4px;left:0;width:44px;height:12px;}
.time{font-size:24px;color:#999999;line-height:24px;}
.manage-wrap{height: 72px;width: 72px;align-items:flex-end ;justify-content:center;}
.manage{font-family:iconfont;font-size:32px;color:#D4D7DD;}
</style>
<script>
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    props: {
      header: {
        type: Object,
        required: true,
      },
      source:{
        type: String,
        required: true,
      },
      index:{
        type: Number,
        required: true
      },
      discuss:{
        type: Array,
        required: true,
      }
    },
    computed: {
      user () {return this.$store.state.user}
    },
    created(){
      this.getUid()
      var now = new Date().getTime(),
          past = this.header.uptime*1000,
          time=(now-past)/1000, 
          _this=this;
          if (time > 0 && time < 60) {
              _this.uptime='刚刚'
          }else if(time > 60 && time < 3600){
              _this.uptime=parseInt(time/60)+'分钟前'
          }else if(time >= 3600 && time < 3600*24){
              _this.uptime=parseInt(time/3600)+'小时前'
          }else if(time >=3600*24 && time < 3600*48){
              _this.uptime='1天前'
          }else if(time >=3600*48 && time < 3600*72){
              _this.uptime='2天前'
          }else if(time >=3600*72 && time < 3600*96){
              _this.uptime='3天前'
          }else if(time >=3600*96 && time < 3600*120){
              _this.uptime='4天前'
          }else if(time >=3600*120 && time < 3600*144){
              _this.uptime='5天前'
          }else{
             _this.uptime= new Date(past).toLocaleDateString().replace(/\//g, "-");
          }
    },
    data () {
      return {
        uptime:''
      }
    },
    computed: {
      user () {return this.$store.state.user}
    },
    methods: {
      getUid(){
        storage.getItem('uid', event => {
          this.$store.dispatch('GET_HIS',{uid:`${event.data}`})
        })
      },
      change (object,index,discuss){
          if (this.user.uid=="0") {
            this.tologin()
          }else{
                var _this=this
                var NowData={
                  object:object,
                  index:index,
                  Array:discuss
                }
                _this.$store.dispatch('Nowlog',NowData)
                XHR.admin({"uid":_this.user.uid}).then( function (res) {
                  if (res.data.status) {
                      if (object.m_uid==_this.user.uid) {
                          _this.$store.dispatch('changeManage','me')
                      }else{
                          _this.$store.dispatch('changeManage','super')
                      }
                  }else{
                      if (object.m_uid==_this.user.uid) {
                          _this.$store.dispatch('changeManage','me')
                      }else{
                          _this.$store.dispatch('changeManage','ather')
                      }
                  }
              })
          }
      },
      onload(e){
        // modal.alert({message: this.share.source})
        if (!e.success) {
          this.header.avatar="https://s.kcimg.cn/test/trucknew/images/avater.png"
        }
      },
      toUser(){
        // modal.alert({message: this.user.uid})
        if (this.user.uid=="0") {
            this.tologin()
        }else{
          this.skip(`user.weex.js?uid=${this.header.m_uid}`)
        }
      },
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
      },
    },
  }
</script>
