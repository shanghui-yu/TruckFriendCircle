<template>
  <scroller class="add-wrap">
    <div><title :title="title"></title></div>
    <div class="search" @click="skip(`search.weex.js`)">
        <text class="search-icon">&#xe6d7;</text><text class="search-btn">搜索</text>
    </div>
    <div class="truck-master">
        <div class="master-title">
            <image src="https://s.kcimg.cn/test/trucknew/images/Praise.png" class="master-title-bg"></image>
            <text class="master-name">集赞达人</text>
        </div>
        <div class="master-list">
            <div class="master-people" v-for="item in setLike.topThree">
                <image class="master-avater" :src="item.avatar" @click="toUser(item.uid)"></image>
                <text style="font-size:24px;line-height:36px;">{{item.username}}</text>
                <text style="font-size:24px;line-height:36px;color:#999">集赞：{{item.countZan}}</text>
            </div>
            <div class="master-people">
                <text class="more-master master-avater" style="border-color: #FF9D3A;color:#FF9D3A" @click="skip(`MoreTruckList.weex.js?type=1`)">更多</text>
            </div>
        </div>
    </div>
    <div class="truck-master">
        <div class="master-title">
            <image src="https://s.kcimg.cn/test/trucknew/images/popularity.png" class="master-title-bg"></image>
            <text class="master-name">人气王子</text>
        </div>
        <div class="master-list">
            <div class="master-people" v-for="item in buzz.topThree">
                <image class="master-avater" :src="item.avatar" @click="toUser(item.uid)"></image>
                <text style="font-size:24px;line-height:36px;">{{item.username}}</text>
                <text style="font-size:24px;line-height:36px;color:#999">粉丝：{{item.countFans}}</text>
            </div>
            <div class="master-people">
                <text class="more-master master-avater" style="border-color:#FFC20D;color:#FFC20D" @click="skip(`MoreTruckList.weex.js?type=2`)">更多</text>
            </div>
        </div>
    </div>
    <div class="truck-master">
        <div class="master-title">
            <image src="https://s.kcimg.cn/test/trucknew/images/trends.png" class="master-title-bg"></image>
            <text class="master-name">动态狂魔</text>
        </div>
        <div class="master-list">
            <div class="master-people" v-for="item in dynamic.topThree">
                <image class="master-avater" :src="item.avatar" @click="toUser(item.uid)"></image>
                <text style="font-size:24px;line-height:36px;">{{item.username}}</text>
                <text style="font-size:24px;line-height:36px;color:#999">动态：{{item.countdt}}</text>
            </div>
            <div class="master-people">
                <text class="more-master master-avater" style="border-color:#41C863;color:#41C863" @click="skip(`MoreTruckList.weex.js?type=3`)">更多</text>
            </div>
        </div>
    </div>
  </scroller>
</template>

<script>
  import Title from '../components/title.vue'
  const modal = weex.requireModule('modal')
  const storage = weex.requireModule('storage')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    components: {Title},
    computed: {
      // 集赞达人
      setLike () {return this.$store.state.setLike},
      // 人气王子
      buzz () {return this.$store.state.buzz},
      // 动态狂魔
      dynamic () {return this.$store.state.dynamic},
      user () {return this.$store.state.user}
    },
    data () {
      return {
        title:'添加卡友',
      }
    },
    created(){
        this.$store.dispatch('SET_LIKE')
        this.$store.dispatch('BUZZ')
        this.$store.dispatch('DYNAMIC')
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
      toUser(u){
        if (this.user.uid=="0") {
            this.tologin()
        }else{
          this.skip(`user.weex.js?uid=${u}`)
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

<style scoped>
    .add-wrap{ min-height: 100%;background-color: #f7f9fa;}
    .search{margin-left: 30px;margin-top: 30px;margin-right: 30px;margin-bottom: 30px;position: relative;height: 70px;
        justify-content: center;align-items: center;background-color: #fff;
            border-top-left-radius:5px;
          border-top-right-radius:5px;
          border-bottom-left-radius:5px;
          border-bottom-right-radius:5px;
        flex-direction: row;}
    .search-btn{font-size: 28px; color: #B8B8B8;}
    .search-icon{font-family: iconfont; font-size: 28px;color: #B8B8B8;margin-right: 10px;}
    .truck-master{background-color: #fff;margin-bottom: 20px;}
    .master-title{position: relative; justify-content: center;align-items: center;padding-top: 20px;padding-bottom: 20px;}
    .master-title-bg{width: 240px;height: 60px;}
    .master-name{position: absolute;color: #fff;font-size: 24px;z-index: 5;text-align: center;top:35px;left: 0;right: 0;}
    .master-list{flex-direction: row;padding-bottom: 28px;box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);}
    .master-people{flex: 1;align-items: center;}
    .master-avater{width: 80px;height: 80px;border-radius: 40px;margin-top: 10px;margin-bottom: 10px;}
    .more-master{border-width: 1px;border-style: solid;text-align: center;line-height: 80px;font-size: 24px;}
</style>
