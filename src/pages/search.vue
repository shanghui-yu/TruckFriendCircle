<template>
<div class="wrapper">
    <div class="search">
        <div class="search-content">
          <text class="search-icon">&#xe6d7;</text>
          <input class="input" autofocus type="text" @change="searCh" placeholder="请输入用户名" />
        </div>
      <div class="cancel" @click="back()"><text>取消</text></div>
    </div>
    <state v-if="loading" :text="statetext"></state>
    <div class="scroller" v-if="searchContent.length!='0'">
          <list class="search-wrap" @loadmore="loadmorediscuss" loadmoreoffset="10">
              <cell class="search-list" v-for='(item,index) in searchContent' @click="skip(`user.weex.js?uid=${item.uid}`)">
                   <image class="search-avater" :src="item.avatar" ></image>
                   <div style="flex:1; justify-content: center;">
                       <text class="name">{{item.username}}</text>
                       <div style="flex-direction: row;align-items: center;">
                          <text style="color:#999;line-height:36px;font-size:24px;">关注：{{item.count_ownconcern}}</text>
                          <div class="line"></div>
                          <text style="color:#999;line-height:36px;font-size:24px;">粉丝：{{item.count_othconcern}}</text>
                       </div>
                   </div>
                  <div v-if="item.concern=='no'||user.uid=='0'" @click="addfollow(item,searchContent,index)"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/add-follow.png"></image></div>
                  <div v-if="item.concern=='yes'&&item.concernReverse=='no'" @click="cancelfollow(item,searchContent,index)"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow-ok.png"></image></div>
                  <div v-if="item.concern=='yes'&&item.concernReverse=='yes'"><image class="follow-btn" src="https://s.kcimg.cn/test/trucknew/images/follow.png"></image></div>
              </cell>
              <cell>
                  <div class="loading-wrap" v-if="!listend"><text class="loading">正在加载中...</text></div>
                  <div class="list-end" v-if="listend"><text>已经到底了</text></div>
              </cell>
          </list>  
     </div>
     <div><confirm v-if="showconfirm"></confirm></div>
</div>
</template>

<script>
  import XHR from '../api'
  import State from '../components/state.vue'
  import Confirm from '../components/confirm.vue'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  var navigator = weex.requireModule('navigator')
  const globalEvent = weex.requireModule('globalEvent')
  export default {
    components: { State ,Confirm},
    data () {
      return {
        searchContent:[],
        loading:false,
        statetext:'正在加载中...',
        pageloading:true,
        page:2,
        searchText:'' ,
        listend:false, 
        cancel:{}             //取消关注的时候需要用到 
      }
    },
    computed: {
      Nowlog () {return this.$store.state.Nowlog},
      showconfirm () {return this.$store.state.confirm},
      user () {return this.$store.state.user}
    },
    created () {
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
      searCh(event){
        let _this=this
        this.loading=true;
        this.statetext='正在加载中'
        this.searchText=event.value
        this.searchContent=[]
        XHR.search({"username":event.value}).then( function (res) {
          if (res.data.user.length=="0") {
            _this.statetext="暂无此用户"
          }else{
            _this.loading=false;
            _this.searchContent=res.data.user 
          }
        })
      },
      back: function () {
        navigator.pop({
            animated: "true"
          }, event => {
              console.log(1)
          })
      },
      loadmorediscuss(){
        let _this=this
        if (this.pageloading) {
          this.pageloading=false
          XHR.search({"username":this.searchText,"page":this.page}).then( function (res) {
                var search = res.data.user
                // modal.alert({message: search})
                for (var i = 0; i < search.length; i++) {
                  _this.searchContent.push(search[i]) 
                }
            _this.page++
            if (search.length==0 ||search.length<15) {
                  _this.pageloading=false
                  _this.listend=true
              }else{
                 _this.pageloading=true
              }
          })
        }
      },
      addfollow(object,content,index){
         var _this=this
         if (this.user.uid=='0') {
              this.tologin
         }else{
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

<style scoped>
    .wrapper{background-color:#f7f9fa}
    .search{padding-left: 30px;padding-right: 30px;padding-top: 14px;padding-bottom: 14px;flex-direction: row;background-color: #FAFBFC;align-items: center;}
    .search-content{flex: 1;border-width: 1px;border-style: solid;border-color: #e5e5e5;height: 60px;
      border-top-left-radius:5px;
      border-top-right-radius:5px;
      border-bottom-left-radius:5px;
      border-bottom-right-radius:5px;
      flex-direction: row;align-items: center;margin-right: 30px;background-color: #fff;}
    .search-icon{width: 56px;height: 56px;font-size: 28px;color: #B8B8B8;text-align: center;line-height: 56px;font-family: iconfont;}
    .input{flex: 1;border-width: 0;padding-right: 20px;font-size: 28px;placeholder-color: #B8B8B8;height: 60px;color: #333;}
    .search-wrap{padding-left: 30px;background-color: #fff;}
    .search-list{padding-top: 30px;padding-bottom: 30px;padding-right: 30px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #e5e5e5;flex-direction: row;align-items: center;}
    .search-avater{width: 72px;height: 72px;
      border-top-left-radius:36px;
      border-top-right-radius:36px;
      border-bottom-left-radius:36px;
      border-bottom-right-radius:36px;
      margin-right: 20px;}
    .name{lines:1;width: 130px;white-space: nowrap;text-overflow: ellipsis;}
    .line{margin-left: 20px;margin-right: 20px;width: 1px;background-color:#e5e5e5;height: 24px; }
    .follow-btn{width: 130px;height: 60px;}

    .loading-wrap{justify-content: center;align-items: center;height: 88px;padding-top: 0}
    .list-end{justify-content: center;align-items: center;height: 88px;padding-top: 0}
</style>
