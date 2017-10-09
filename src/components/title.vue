<template>
  <div class="header">
      <div class="back" @click="back"><text class="back-text">&#xe6d6;</text></div>
      <div class="title"><text class="text">{{title}}</text></div>
      <div class="datailManage" v-if="title=='动态详情'" @click="change"><text class="detail-text">&#xe6de;</text></div>
  </div>
</template>

<style scoped>
  .header{height: 88px;flex-direction: row;justify-content: center;align-items: center;border-bottom-color: #e5e5e5;border-bottom-style: solid;border-bottom-width: 1px;}
  .back{height: 88px;width: 88px;justify-content: center;align-items: center;}
  .back-text{color: #1571E5;font-family: iconfont;font-size: 36px;}
  .title{flex:1;justify-content: center;align-items: center;margin-right: 88px;}
  .text{font-size: 36px;}
  .datailManage{height: 88px;width: 88px;justify-content: center;align-items: center;}
  .detail-text{font-family: iconfont;font-size: 36px;}
</style>

<script>
  import XHR from '../api'
  const navigator = weex.requireModule('navigator')
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    props:['title',"info"],
    data () {
      return {
      }
    },
    created(){
      storage.getItem('uid', event => {
        var uid = event.data
        if (event.data=="0") {
          this.$store.dispatch('GET_HIS',{uid:`0`,avatar:''})
        }else{
          storage.getItem('avatar', event => {
            this.$store.dispatch('GET_HIS',{uid:`${uid}`,avatar:`${event.data}`})
          })
        }
      })
    },
    methods: {
      back(){
          navigator.pop({
            animated: "true"
          }, event => {
              console.log(1)
          })
      },
      change(){
        if (this.user.uid=="0") {
          this.tologin()
        }else{
          var _this=this
          var NowData={
              object:this.info[0],
              index:0,
              Array:this.info
            }
          _this.$store.dispatch('Nowlog',NowData)
          XHR.admin({"uid":_this.user.uid}).then( function (res) {
              if (res.data.status) {
                  if (_this.info[0].m_uid==_this.user.uid) {
                      _this.$store.dispatch('changeManage','me')
                  }else{
                      _this.$store.dispatch('changeManage','super')
                  }
              }else{
                  if (_this.info[0].m_uid==_this.user.uid) {
                      _this.$store.dispatch('changeManage','me')
                  }else{
                      _this.$store.dispatch('changeManage','ather')
                  }
              }
          })
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
    }
  }
</script>
