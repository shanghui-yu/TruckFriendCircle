<template>
  <div class="flow-btn" @click="topull">
    <image class="flow-icon" src="https://s.kcimg.cn/test/trucknew/images/post-btn.png"></image>
  </div>
</template>

<style scoped>
  .flow-btn{position: absolute;right: 36px;bottom: 126px;z-index: 5;}
  .flow-icon{width: 108px;height: 112px;}
</style>

<script>
  import XHR from '../api'
  const modal = weex.requireModule('modal')
  const storage = weex.requireModule('storage')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    props:['source','aid','title'],
    data () {
      return {
      }
    },
    computed: {
      user () {return this.$store.state.user}
    },
    created(){
    },
    methods: {
      topull(){
        if (this.user.uid=="0") {
            this.tologin()
        }else{
          weex.requireModule('THAW').topublish( { 
            "source": this.source,  
            "aid":this.aid,
            "title":this.title
           });
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
