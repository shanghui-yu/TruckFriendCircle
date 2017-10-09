<template>
  <div class="wrapper">
    <!-- <div><app-header></app-header></div> -->
    <div class="slide">
      <div class="tab-nav">
        <div class="nav-li" @click="tabAllNav(1)">
          <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/new-btn.png"></image>
        </div>
        <div class="nav-li" @click="tabAllNav(2)">
          <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/video-btn.png"></image>
        </div>
        <div class="nav-li" @click="tabAllNav(3)">
          <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/follow-select.png"></image>
        </div>
      </div>
      <list class="list" @loadmore="morefol" loadmoreoffset="50" v-if="user.uid!='0'">
        <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
           <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
        </refresh>
        <cell v-for="(item, index) in folTab.DATA" class="row" :index="index" keep-scroll-position="true" :ref="'item'+index" @disappear="ondisappear(index)">
          <list-centent :wrapcenter="item" :source="source" :index="index" :discuss="folTab.DATA"></list-centent>
        </cell>
        <cell>
            <div class="loading-wrap" v-if="!listend"><text class="loading">正在加载中...</text></div>
            <div class="list-end" v-if="listend"><text>已经到底了</text></div>
        </cell>  
      </list>
      <div><no-login v-if="user.uid=='0'"></no-login></div>
    </div>
    <to-post :source="source" :aid="aid" :title="title"></to-post>
    <div><my-manage v-if="showManage=='me'"></my-manage></div>
    <div><other-manage v-if="showManage=='ather'"></other-manage ></div>
    <div><super-manage v-if="showManage=='super'"></super-manage></div>
    <div><confirm v-if="showconfirm"></confirm></div>
  </div>
</template>
<script>
  // import AppHeader from '../components/app-header.vue'
  import NoLogin from '../components/no-login.vue'
  import ListCentent from '../components/list-centent.vue'
  import Confirm from '../components/confirm.vue'
  import MyManage from '../components/my-manage.vue'
  import OtherManage from '../components/other-manage.vue'
  import SuperManage from '../components/super-manage.vue'
  import ToPost from '../components/to-post.vue'
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  const dom = weex.requireModule('dom')
  export default {
    components: {NoLogin,ListCentent,Confirm,MyManage,OtherManage,SuperManage,ToPost},
    computed: {
      // 全部－关注
      folTab () {return this.$store.state.folTab},
      user () {return this.$store.state.user},
      showManage () {return this.$store.state.changeManage},
      showconfirm () {return this.$store.state.confirm},
      user () {return this.$store.state.user}
    },
    data () {
      return {
        title:'',
        source:'home',
        Page:2,     
        loading:true,
        listend:false,
        refreshing: false,
        showConfirm:false,
        aid:''
      }
    },
    created(){
      var domModule = weex.requireModule('dom');
      domModule.addRule('fontFace',{
          'fontFamily':'iconfont',
          'src':"url(\'http://at.alicdn.com/t/font_qv5etitfumtb7qfr.ttf\')"
      })
      var fol=this.$store.state.folTab
      if(fol.DATA.length==0){
        var json={type:"ajax"}
            this.$store.dispatch('GET_ALL_FOLLOW',json)
      }
      storage.getItem('uid', event => {
        var uid = event.data
        if (event.data=='0') {
          this.$store.dispatch('GET_HIS',{uid:`0`,avatar:''})
        }else{
          storage.getItem('avatar', event => {
            this.$store.dispatch('GET_HIS',{uid:`${uid}`,avatar:`${event.data}`})
          })
        }
        // modal.alert({message: this.user})
      })
    },
    mounted(){
      if (this.folTab.top!=0) {
          this.GoToBack()
        }
    },
    methods: {
      onrefresh (event) {
        this.refreshing = true
        var _this=this, json={type:"ajax"}
        XHR.getAllFollow(json).then( function (res) {
          _this.folTab.DATA=res.data.log  
          _this.refreshing = false
        })
      },
      onpullingdown (event) {
        console.log('is onpulling down')
      },
      GoToBack () {
        var index=this.folTab.top
        let el = this.$refs['item'+ index][0]
        dom.scrollToElement(el, {})
      },
      ondisappear(index){
         var json={type:'follow',top:index}
         this.$store.dispatch('GOTOBACK',json)
      },
      tabAllNav (nb) {
        this.$store.dispatch('ALL_NAV',nb)
        if (nb=="1") {
           this.jump(`/HomeNew`)
        }else if(nb=="2"){
           this.jump(`/HomeVideo`)
        }else if(nb=="3"){
           this.jump(`/HomeFollow`)
        }
      },
      morefol(){                                      //滚动加载更多关注
          var json={type:"ajax",page:this.Page}
          var _this=this;
          if (this.loading) {
            _this.loading=false
            XHR.getAllFollow(json).then( function (res) {
                var data= res.data.log;
                for (var i = 0; i < data.length; i++) {
                  _this.folTab.DATA.push(data[i])
                }
                _this.loading=true
                _this.Page++
            })
          }
      },
    }
  }
</script>


<style scoped>
.wrapper{background-color: #f7f9fa;flex:1;}
.slide{flex:1;}
.list{flex:1;}
.flow-btn{position: absolute;right: 36px;bottom: 126px; z-index: 5;}
.flow-icon{width: 108px;height: 112px;}
.tab-nav{background-color: #f7f9fa;height: 88px;padding-left: 30px;padding-right: 30px;flex-direction:row;justify-content: center;align-items: center;}
.nav-li{flex:1; flex-direction:row;justify-content: center;align-items: center;}
.nav-icon{width: 120px;height: 44px;}
.row{padding-bottom: 20px;background-color:#FAFBFC;}
.loading-wrap{justify-content: center;align-items: center;height: 88px;padding-top: 0}
.list-end{justify-content: center;align-items: center;height: 88px;padding-top: 0}
.refresh{justify-content: center;align-items: center;padding-top: 20px;padding-bottom: 20px;}
</style>
