<template>
  <div class="wrapper">
    <!-- <div><app-header></app-header></div> -->
    <div class="slide">
      <div class="tab-nav">
        <div class="nav-li" @click="tabNear(1)">
          <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/trends-btn.png"></image>
        </div>
        <div class="nav-li" @click="tabNear(2)">
          <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/truck-select.png"></image>
        </div>
      </div>
      <list class="list" @loadmore="morefel" loadmoreoffset="50" v-if="user.uid!='0'">
        <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
           <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
        </refresh>
        <cell keep-scroll-position="true" v-for="(item, index) in felTab.DATA" :ref="'item'+index" @disappear="ondisappear(index)">
          <nearby-truck :truck="item"></nearby-truck>
        </cell>
        <cell>
            <div class="loading-wrap" v-if="!listend"><text class="loading">正在加载中...</text></div>
            <div class="list-end" v-if="listend"><text>已经到底了</text></div>
        </cell>  
      </list>
      <div><no-login v-if="user.uid=='0'"></no-login></div>
    </div>
    <to-post :source="source" :aid="aid" :title='title'></to-post>
    <div><my-manage v-if="showManage=='me'"></my-manage></div>
    <div><other-manage v-if="showManage=='ather'"></other-manage ></div>
    <div><super-manage v-if="showManage=='super'"></super-manage></div>
    <div><confirm v-if="showconfirm"></confirm></div>
  </div>
</template>
<script>
  import NoLogin from '../components/no-login.vue'
  import ListCentent from '../components/list-centent.vue'
  import Confirm from '../components/confirm.vue'
  import MyManage from '../components/my-manage.vue'
  import OtherManage from '../components/other-manage.vue'
  import SuperManage from '../components/super-manage.vue'
  import NearbyTruck from '../components/nearby-truck.vue'
  import ToPost from '../components/to-post.vue'
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const dom = weex.requireModule('dom')
   const modal = weex.requireModule('modal')
  export default {
    components: {NoLogin,ListCentent,Confirm,MyManage,OtherManage,SuperManage,NearbyTruck,ToPost},
    computed: {
      // 附近－卡友
      felTab () {return this.$store.state.felTab},
      user () {return this.$store.state.user},
      showManage () {return this.$store.state.changeManage},
      showconfirm () {return this.$store.state.confirm}
    },
    data () {
      return {
        title:'',
        source:'home',
        Page:2,        //热门页码  
        loading:true,
        listend:false,
        showConfirm:false,
        refreshing: false,
        aid:''
      }
    },
    created(){
        var domModule = weex.requireModule('dom');
        domModule.addRule('fontFace',{
            'fontFamily':'iconfont',
            'src':"url(\'http://at.alicdn.com/t/font_qv5etitfumtb7qfr.ttf\')"
        })
        storage.getItem('uid', event => {
          var uid = event.data
          if(this.felTab.DATA.length==0){
            storage.getItem('address', event => {
              var res =JSON.parse(event.data) 
              var json={uid:`${uid}`,lng:`${res.longitude}`,lat:`${res.latitude}`,page:'1'}
               this.$store.dispatch('GET_NEAR_TRUCK',json)
            })
          }
          if (event.data=='0') {
            this.$store.dispatch('GET_HIS',{uid:`0`,avatar:''})
          }else{
            storage.getItem('avatar', event => {
              this.$store.dispatch('GET_HIS',{uid:`${uid}`,avatar:`${event.data}`})
            })
          }
        })
    },
    mounted(){
      if (this.felTab.top!=0) {
          this.GoToBack()
        }
    },
    methods: {
      onrefresh (event) {
        this.refreshing = true
        var _this=this
        storage.getItem('address', event => {
          var res =JSON.parse(event.data) 
          var json={uid:`${this.user.uid}`,lng:`${res.longitude}`,lat:`${res.latitude}`,page:'1'}
          XHR.getNearTruck(json).then( function (my) {
             _this.felTab.DATA= my.data.data.contents;
             _this.refreshing = false
          })
        })
      },
      onpullingdown (event) {
        console.log('is onpulling down')
      },
      tabNear(n){
          this.$store.dispatch('TAB_NEA',n)
          if (n=="1") {
            this.jump('/HomeNeanav')
          }else {
            this.jump('/HomeNeatruck')
          }
      },
      GoToBack () {
        var index=this.felTab.top
        let el = this.$refs['item'+ index][0]
        dom.scrollToElement(el, {})
      },
      ondisappear(index){
         var json={type:'near-truck',top:index}
         this.$store.dispatch('GOTOBACK',json)
      },
      morefel(){                                      //滚动加载附近卡友
        storage.getItem('address', event => {
          var res =JSON.parse(event.data) 
          var json={uid:`${this.user.uid}`,lng:`${res.longitude}`,lat:`${res.latitude}`,page:`${this.Page}`}
          var _this=this;
          if (this.loading) {
            this.loading=false
            XHR.getNearTruck(json).then( function (re) {
                var data= re.data.data;
                for (var i = 0; i < data.contents.length; i++) {
                  _this.felTab.DATA.push(data.contents[i])
                }
                if (data.size!="30") {
                  _this.loading=false
                  _this.listend=true
                }else{
                  _this.loading=true
                  _this.Page++
                }
            })
          }
        })
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
.tab-nav{background-color: #f7f9fa;height: 88px;padding-left: 30px;padding-right: 30px;flex-direction:row;justify-content: center;align-items: center;padding-left: 140px;padding-right: 140px;}
.nav-li{flex:1; flex-direction:row;justify-content: center;align-items: center;}
.nav-icon{width: 120px;height: 44px;}
.row{padding-bottom: 20px;background-color:#FAFBFC;}
.loading-wrap{justify-content: center;align-items: center;height: 88px;padding-top: 0}
.list-end{justify-content: center;align-items: center;height: 88px;padding-top: 0}
.refresh{justify-content: center;align-items: center;padding-top: 20px;padding-bottom: 20px;}
</style>
