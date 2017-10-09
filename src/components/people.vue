<template>
  <div class="follow-wrap" >
    <div class="follow-content">
        <image :src="people.avatar" class="follow-avatar" placeholder="https://s.kcimg.cn/test/trucknew/images/avater.png" @load="onload"></image>
        <div class="follow-name"><text>{{people.username}}</text></div>
        <div v-if="people.uid!=user.uid">
            <div v-if="people.concern=='no'||user.uid=='0'" @click="addfollow(people,peoplelist,index)">
              <image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/add-follow.png"></image>
            </div>
            <div v-if="people.concern=='yes'&&people.concernReverse=='no'" @click="cancelfollow(people,peoplelist,index)">
              <image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow-ok.png"></image>
            </div>
            <div v-if="people.concern=='yes'&&people.concernReverse=='yes'">
              <image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow.png"></image>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
    .follow-wrap{
      padding-left: 30px;
      background-color: #fff;
    }
    .follow-content{
      flex-direction: row;
      padding-top: 30px;
      padding-bottom: 30px;
      padding-right: 30px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: #f5f5f5;
      align-items:center;
    }
    .follow-avatar{
      width: 72px;
      height: 72px;
      border-top-left-radius:36px;
      border-top-right-radius:36px;
      border-bottom-left-radius:36px;
      border-bottom-right-radius:36px;
      margin-right: 20px;
    }
    .follow-name{
      flex: 1;
    }
    .follow-btn{
      width: 130px;
      height: 60px;
    }
</style>
<script>
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    props:["people","peoplelist","aid"],
    computed: {
      showconfirm () {return this.$store.state.confirm},
      user () {return this.$store.state.user}
    },
    data () {
      return {
      }
    },
    created(){
      // modal.alert({message: this.people})
    },
    methods: {
      addfollow(object,content,index){
         var _this=this
         if (this.user.uid=='0') {
            this.tologin()
         }else{
            XHR.addfollow({"aid":object.aid}).then(function(res){
                if (res.data.status=="1") {
                    object.concern="yes"
                }
            })
         }
      },
      cancelfollow(object,content,index){
        this.$store.dispatch('confirm',true)
        var NowData={object:object,Array:content}
            this.$store.dispatch('Nowlog',NowData)
      },
      onload(e){
        // modal.alert({message: this.share.source})
        if (!e.success) {
          this.header.avatar="https://s.kcimg.cn/test/trucknew/images/avater.png"
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
