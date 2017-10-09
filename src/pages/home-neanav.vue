<template>
  <div class="wrapper">
      <!-- <div><app-header></app-header></div> -->
      <div class="slide">
        <div class="tab-nav">
          <div class="nav-li" @click="tabNear(1)">
            <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/trends-select.png"></image>
          </div>
          <div class="nav-li" @click="tabNear(2)">
            <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/truck-btn.png"></image>
          </div>
        </div>
        <list class="list" @loadmore="moreact" loadmoreoffset="50">
          <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
             <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
          </refresh>
          <cell v-for="(item, index) in actTab.DATA" class="row" :index="index" keep-scroll-position="true" :ref="'item'+index" @appear="ondisappear(index)">
            <list-centent :wrapcenter="item" :source="source" :index="index" :discuss="actTab.DATA"></list-centent>
          </cell>
          <cell>
              <div class="loading-wrap" v-if="!listend"><text class="loading">正在加载中...</text></div>
              <div class="list-end" v-if="listend"><text>已经到底了</text></div>
          </cell>  
        </list>
      </div>
      <!-- <div class="flow-btn" @click="jump('/postfm')">
        <image class="flow-icon" src="https://s.kcimg.cn/test/trucknew/images/post-btn.png"></image>
      </div> -->
      <to-post :source="source" :aid="aid" :title="title"></to-post>
      <div><my-manage v-if="showManage=='me'"></my-manage></div>
      <div><other-manage v-if="showManage=='ather'"></other-manage ></div>
      <div><super-manage v-if="showManage=='super'"></super-manage></div>
      <div><confirm v-if="showconfirm"></confirm></div>
  </div>
</template>
<script>
  // import AppHeader from '../components/app-header.vue'
  import ListCentent from '../components/list-centent.vue'
  import Confirm from '../components/confirm.vue'
  import MyManage from '../components/my-manage.vue'
  import OtherManage from '../components/other-manage.vue'
  import SuperManage from '../components/super-manage.vue'
  import ToPost from '../components/to-post.vue'
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const dom = weex.requireModule('dom')
  const modal = weex.requireModule('modal')
  export default {
    components: { ListCentent,Confirm,MyManage,OtherManage,SuperManage,ToPost},
    computed: {
      // 附近－动态
      actTab () {return this.$store.state.actTab},
       // 用户信息
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
            var act=this.$store.state.actTab
            if(act.DATA.length==0){
              storage.getItem('address', event => {
                var res =JSON.parse(event.data) 
                  this.$store.dispatch('GET_NEAR_TRENDS',{latitude:`${res.latitude}`,longitude:`${res.longitude}`})
              })
               // modal.alert({message: this.actTab.DATA})
            }
    },
    mounted(){
      if (this.actTab.top!=0) {
          this.GoToBack()
        }
    },
    methods: {
      onrefresh (event) {
        this.refreshing = true
        var _this=this
        storage.getItem('address', event => {
          var res =JSON.parse(event.data) 
          var json={latitude:`${res.latitude}`,longitude:`${res.longitude}`}
            XHR.getNearTrends(json).then( function (res) {
              _this.actTab.DATA=res.data.data  
              _this.refreshing = false
            })
        })
      },
      onpullingdown (event) {
        console.log('is onpulling down')
      },
      GoToBack () {
        var index=this.actTab.top
        let el = this.$refs['item'+ index][0]
        dom.scrollToElement(el, {})
      },
      ondisappear(index){
         var json={type:'near-dongtai',top:index}
         this.$store.dispatch('GOTOBACK',json)
      },
      tabNear(n){
         this.$store.dispatch('TAB_NEA',n)
          if (n=="1") {
            this.jump('/HomeNeanav')
          }else {
            this.jump('/HomeNeatruck')
          }
      },
      moreact(){                                      //滚动加载附近动态
          storage.getItem('address', event => {
            var res =JSON.parse(event.data) 
            var json={latitude:`${res.latitude}`,longitude:`${res.longitude}`,page:`${this.Page}`}
            var _this=this;
            if (this.loading) {
              this.loading=false
              XHR.getNearTrends(json).then( function (res) {
                  var data= res.data.data;
                  for (var i = 0; i < data.length; i++) {
                    _this.actTab.DATA.push(data[i])
                  }
                  if (data.length=="0") {
                    _this.loading=false
                  }else{
                    _this.loading=true
                    _this.Page++
                  }
              })
            }
          })
      }
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
