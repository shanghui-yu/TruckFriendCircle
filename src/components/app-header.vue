<template>
<div class="header">
    <div @click="tologin"><text class="blue-text" v-if="user.uid=='0'">登录</text></div>
    <div @click="skip(`user.weex.js?uid=${user.uid}`)" v-if="user.uid!='0'">
      <image class="avater" :src="user.avatar"></image>
    </div>
    <!-- <div class="ceshi" @click="jump('/ceshi')">
      <text>路由</text>
    </div> -->
    <div class="content">
        <div @click="totab(1)" class="nav">
            <div><text v-bind:class="[tabAll == '1' ? 'active-text' : 'nav-text']">热门</text></div>
            <div class="line" v-if="tabAll == '1'"></div>
        </div>
        <div @click="totab(2)" class="nav">
           <div><text v-bind:class="[tabAll == '2' ? 'active-text' : 'nav-text']">全部</text></div>
           <div class="line" v-if="tabAll == '2'"></div>
        </div>
        <div @click="totab(3)" class="nav">
            <div><text v-bind:class="[tabAll == '3' ? 'active-text' : 'nav-text']">附近</text></div>
            <div class="line" v-if="tabAll == '3'"></div>
        </div>
    </div>
    <div @click="skip(`addtruck.weex.js`)"><text class="blue-text">&#xe6d4;</text></div>
</div>
</template>
<script>
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  var navigator = weex.requireModule('navigator')
  const modal = weex.requireModule('modal')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    data () {
      return {
      }
    },
    created(){
      storage.getItem('uid', event => {
        // modal.alert({message: event.data})
        var uid = event.data
        if (event.data=="0") {
          this.$store.dispatch('GET_HIS',{uid:`0`,avatar:''})
        }else{
          storage.getItem('avatar', event => {
            this.$store.dispatch('GET_HIS',{uid:`${uid}`,avatar:`${event.data}`})
            // modal.alert({message: this.user.avatar})
          })
        }
      })

    },
    computed: {
      // 最新－视频－关注－状态
      allNav () {return this.$store.state.allNav},
      // 热门－全部－附近－状态
      tabAll () {return this.$store.state.tabAll},
      neaNav () {return this.$store.state.neaNav},
      user () {return this.$store.state.user}
    },
    methods: {
      tologin(){
        if ( this.user.uid=='0') {
           weex.requireModule('THAW').onGoLogin();
           var _this=this
           globalEvent.addEventListener('onGoLoginCallBack',function(res){
                if (res.status=='1') {
                  storage.setItem('uid',res.userId)
                  storage.setItem('version',res.versionCode)
                  _this.getUser(res.userId)
                }
            })
        }
      },
      getUser(uid){
         var _this=this
         XHR.getHis({"uid":uid}).then( function (res) {
            var userData=res.data.user
                storage.setItem('avatar',userData.avatar)
               _this.$store.dispatch('GET_HIS',{uid:`${uid}`,avatar:`${userData.avatar}`})
          })
      },
      totab(nb){
        this.$store.dispatch('TAB_ALL',nb)
        if (nb=='1') {
          this.jump(`/home`)
        }else if(nb=='2'){
          switch (this.allNav) {
            case 1:
              this.jump(`/HomeNew`)
              break;
            case 2:
              this.jump(`/HomeVideo`)
              break;
            case 3:
              this.jump(`/HomeFollow`)
              break;
          }
        }else if(nb=='3'){
          weex.requireModule('THAW').getLocation();
          globalEvent.addEventListener('getLocationBack',function(res){
                storage.setItem('address',res)
              // modal.alert({message: res})
          })
          switch (this.neaNav) {
            case 1:
              this.jump(`/HomeNeanav`)
              break;
            case 2:
              this.jump(`/HomeNeatruck`)
              break;
          }
        }
      },
    }
  }
</script>
<style scoped>
  .header{padding-left: 30px;padding-right: 30px;justify-content: center;align-items: center;flex-direction: row;height: 88px;border-bottom-width: 1px;border-bottom-color: #E5E5E5;border-bottom-style: solid;}
  .blue-text{font-size: 32px;color: #1571E5;font-family: iconfont}
  .content{flex: 1;flex-direction: row;justify-content: center;align-items: center;}
  .nav{margin-right: 30px;width: 80px;height: 88px;justify-content: center;align-items: center;margin-left: 30px;position: relative;}
  .line{border-bottom-width: 4px;border-bottom-color: #1571E5;border-bottom-style: solid;position: absolute;left: 0;right: 0;bottom: 0;}
  .active-text{color:#1571E5;font-size: 36px;}
  .nav-text{font-size: 32px;}
  .avater{width: 72px;height: 72px;border-radius: 36px;}
</style>
