<template>
      <div class="scroller">
          <div><title :title="title"></title></div>
          <list class="master-wrap" v-if='type=="1"' @loadmore="loadmoreZan" loadmoreoffset="10">
              <refresh class="refresh" @refresh="onrefreshzan" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
               <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
              </refresh>
              <cell class="master-list" v-for="(item, index) in SetLike.DATA" @click="toUser(item.uid)">
                    <div class="ranking-wrap">
                        <image v-if="index < 3" class="ranking-icon" :src="'https://s.kcimg.cn/test/trucknew/images/rank'+(++index)+'.png'"></image>
                        <div v-else><text style="font-size:40px;color:#999">{{index++}}</text></div>
                    </div>
                    <div class="master-content">
                        <image class="master-avater" :src="item.avatar"></image>
                        <div style="flex:1; justify-content: center;">
                            <text class="name">{{item.username}}</text>
                            <text style="color:#999;line-height:36px;font-size:24px;">集赞：{{item.countZan}}</text>
                        </div>
                    </div>
                    <div v-if="item.concern=='no'||user.uid=='0'" @click="addfollow(item,SetLike.DATA,index-1)"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/add-follow.png"></image></div>
                    <div v-if="item.concern=='yes'&&item.concernReverse=='no'" @click="cancelfollow(item,SetLike.DATA,index-1)"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow-ok.png"></image></div>
                    <div v-if="item.concern=='yes'&&item.concernReverse=='yes'"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow.png"></image></div>
              </cell>
              <cell>
                  <div class="loading-wrap" v-if="!listend"><text class="loading">正在加载中...</text></div>
                  <div class="list-end" v-if="listend"><text>已经到底了</text></div>
              </cell>  
          </list>
          <list class="master-wrap" v-if='type=="2"' @loadmore="loadmorePeople" loadmoreoffset="10">
              <refresh class="refresh" @refresh="onrefreshbuzz" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
               <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
              </refresh>
              <cell class="master-list" v-for="(item, index) in Buzz.DATA" @click="toUser(item.uid)">
                    <div class="ranking-wrap">
                        <image v-if="index < 3" class="ranking-icon" :src="'https://s.kcimg.cn/test/trucknew/images/rank'+(++index)+'.png'"></image>
                        <div v-else><text style="font-size:40px;color:#999">{{index++}}</text></div>
                    </div>
                    <div class="master-content">
                        <image class="master-avater" :src="item.avatar"></image>
                        <div style="flex:1; justify-content: center;">
                            <text class="name">{{item.username}}</text>
                            <text style="color:#999;line-height:36px;font-size:24px;">粉丝：{{item.countFans}}</text>
                        </div>
                    </div>
                    <div v-if="item.concern=='no'||user.uid=='0'" @click="addfollow(item,Buzz.DATA,index-1)"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/add-follow.png"></image></div>
                    <div v-if="item.concern=='yes'&&item.concernReverse=='no'" @click="cancelfollow(item,Buzz.DATA,index-1)"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow-ok.png"></image></div>
                    <div v-if="item.concern=='yes'&&item.concernReverse=='yes'"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow.png"></image></div>
              </cell>
              <cell>
                  <div class="loading-wrap" v-if="!listend"><text class="loading">正在加载中...</text></div>
                  <div class="list-end" v-if="listend"><text>已经到底了</text></div>
              </cell>
          </list>
          <list class="master-wrap" v-if='type=="3"' @loadmore="loadmorediscuss" loadmoreoffset="10">
              <refresh class="refresh" @refresh="onrefreshDynamic" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
               <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
              </refresh>
              <cell class="master-list" v-for="(item, index) in Dynamic.DATA" @click="toUser(item.uid)">
                    <div class="ranking-wrap">
                        <image v-if="index < 3" class="ranking-icon" :src="'https://s.kcimg.cn/test/trucknew/images/rank'+(++index)+'.png'"></image>
                        <div v-else><text style="font-size:40px;color:#999">{{index++}}</text></div>
                    </div>
                    <div class="master-content">
                        <image class="master-avater" :src="item.avatar"></image>
                        <div style="flex:1; justify-content: center;">
                            <text class="name">{{item.username}}</text>
                            <text style="color:#999;line-height:36px;font-size:24px;">动态：{{item.countdt}}</text>
                        </div>
                    </div>
                    <div v-if="item.concern=='no'||user.uid=='0'"  @click="addfollow(item,Dynamic.DATA,index-1)"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/add-follow.png"></image></div>
                    <div v-if="item.concern=='yes'&&item.concernReverse=='no'" @click="cancelfollow(item,Dynamic.DATA,index-1)"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow-ok.png"></image></div>
                    <div v-if="item.concern=='yes'&&item.concernReverse=='yes'"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow.png"></image></div>
              </cell>
              <cell>
                  <div class="loading-wrap" v-if="!listend"><text class="loading">正在加载中...</text></div>
                  <div class="list-end" v-if="listend"><text>已经到底了</text></div>
              </cell>
          </list>  
          <div><confirm v-if="showconfirm"></confirm></div>
     </div>
</template>

<script>
  import XHR from '../api'
  import Confirm from '../components/confirm.vue'
  import Title from '../components/title.vue'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    components: {Confirm , Title},
    computed: {
      // 集赞达人
      SetLike () {return this.$store.state.setLike},
      // 人气王子
      Buzz () {return this.$store.state.buzz},
      // 动态狂魔
      Dynamic () {return this.$store.state.dynamic},
       // 用户信息
      user () {return this.$store.state.user},
      Nowlog () {return this.$store.state.Nowlog},
      showconfirm () {return this.$store.state.confirm}
    },
    created () {
      this.type=weex.config.bundleUrl.match(/type=(\w+)/)[1]
      if (this.type=="1") {
        this.$store.dispatch('SET_LIKE')
        this.title="积攒达人"
      }else if(this.type=="2"){
        this.$store.dispatch('BUZZ')
        this.title="人气王子"
      }else if(this.type=="3"){
        this.$store.dispatch('DYNAMIC')
        this.title="动态狂魔"
      }
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
    data () {
      return {
        refreshing: false,
        type:'',
        page:2,
        loading:true,
        listend:false,
        title:'',
      }
    },
    methods: {
      onrefreshzan (event) {
        this.refreshing = true
        var _this=this;
        XHR.SetLike().then( function (res) {
            _this.SetLike.DATA= res.data.zan   
            _this.refreshing = false  
            // modal.alert({message: _this.refreshing })
        }) 
      },
      onrefreshbuzz (event) {
        this.refreshing = true
        var _this=this;
        XHR.buzz().then( function (res) {
            _this.Buzz.DATA = res.data.fans
            _this.refreshing = false 
        }) 
      },
      onrefreshDynamic (event) {
        this.refreshing = true
        var _this=this;
        XHR.dynamic().then( function (res) {
            _this.Dynamic.DATA = res.data.log
            _this.refreshing = false  
        }) 
      },
      onpullingdown (event) {
        console.log('is onpulling down')
      },
      loadmoreZan(e){
          let _this=this
          if (this.loading) {
               this.loading=false
               XHR.SetLike({"page":this.page}).then( function (res) {
                    var top = res.data.zan
                    for (var i = 0; i < top.length; i++) {
                      _this.SetLike.DATA.push(top[i]) 
                    }
                  _this.page++
                  if (top.length==0 ||top.length<15) {
                      _this.loading=false
                      _this.listend=true
                  }else{
                     _this.loading=true
                  }
              }) 
          }
      },
      loadmorePeople(){
          let _this=this
          if (this.loading){
            this.loading=false
            XHR.buzz({"page":this.page}).then( function (res) {
                var top = res.data.fans
                for (var i = 0; i < top.length; i++) {
                  _this.Buzz.DATA.push(top[i]) 
                }
              _this.page++
              if (top.length==0 ||top.length<15) {
                    _this.loading=false
                    _this.listend=true
              }else{
                 _this.loading=true
              }
            }) 
          }
      },
      loadmorediscuss(){
          let _this=this
          if (this.loading) {
            this.loading=false
            XHR.dynamic({"page":this.page}).then( function (res) {
                var top = res.data.log
                for (var i = 0; i < top.length; i++) {
                  _this.Dynamic.DATA.push(top[i]) 
                }
                _this.page++
                if (top.length==0 ||top.length<15) {
                    _this.loading=false
                    _this.listend=true
                }else{
                   _this.loading=true
                }
            }) 
          }
      },
      addfollow(object,content,index){
         var _this=this
         if (this.user.uid=='0') {
              this.tologin()
         }else{
          console.log(index)
            XHR.addfollow({"aid":object.aid}).then(function(res){
                if (res.data.status=="1") {
                    content[index].concern="yes"
                }
            })
         }
      },
      cancelfollow(object,content,index){
        this.$store.dispatch('confirm',true)
        var NowData={object:object,index:index,Array:content}
            this.$store.dispatch('Nowlog',NowData)
      },
      toUser(u){
        if (this.user.uid=='0') {
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
    .master-wrap{padding-left: 30px;flex: 1;}
    .master-list{padding-top: 10px;padding-bottom: 10px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #e5e5e5;flex-direction: row;justify-content: center;align-items: center;padding-right: 30px;}
    .ranking-wrap{width: 80px;height: 80px;margin-right: 40px;align-items: center;justify-content: center;}
    .ranking-icon{width: 80px;height: 80px;border-top-left-radius:40px;
      border-top-right-radius:40px;
      border-bottom-left-radius:40px;
      border-bottom-right-radius:40px;}
    .master-content{flex: 1;flex-direction: row;}
    .master-avater{width: 120px;height: 120px;margin-right: 30px;border-radius: 60px;}
    .name{font-size: 32px;line-height: 48px;margin-bottom: 14px;margin-top: 14px;lines:1;width: 200px;white-space: nowrap;text-overflow: ellipsis;}
    .follow-btn{width: 130px;height: 60px;}

    .loading-wrap{justify-content: center;align-items: center;height: 88px;padding-top: 0}
    .list-end{justify-content: center;align-items: center;height: 88px;padding-top: 0}
    .refresh{justify-content: center;align-items: center;padding-top: 20px;padding-bottom: 20px;}
</style>
