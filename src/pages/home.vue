<template>
<div>
  <div class="wrapper">
      <!-- <div><app-header></app-header></div> -->
      <list class="hot-scroller" @loadmore="moreHot" loadmoreoffset="50" >
          <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
           <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
          </refresh>
          <cell style="background-color: #f7f9fa;">
            <news :information="hotTab.myMessage"></news>
            <discuss :discuss="hotTab.discuss"></discuss>
            <hot-top :top="hotTab.stick"></hot-top>
          </cell>
          <cell v-for="(item, index) in hotTab.DATA" class="row" keep-scroll-position="true" :ref="'item'+index" @appear="ondisappear(index)">
            <list-centent :wrapcenter="item" :source="source" :index="index" :discuss="hotTab.DATA"></list-centent>
          </cell>
          <cell>
            <div class="loading-wrap" v-if="!listend">
              <text class="loading">正在加载中...</text>
            </div>
            <div class="list-end" v-if="listend">
              <text>已经到底了</text>
            </div>
          </cell>  
      </list>
     <!--  <div class="flow-btn" @click="topull">
        <image class="flow-icon" src="https://s.kcimg.cn/test/trucknew/images/post-btn.png"></image>
      </div> -->
      <to-post :source="source" :aid="aid" :title="title"></to-post>
      <div><my-manage v-if="showManage=='me'"></my-manage></div>
      <div><other-manage v-if="showManage=='ather'"></other-manage ></div>
      <div><super-manage v-if="showManage=='super'"></super-manage></div>
      <div><confirm v-if="showconfirm"></confirm></div>
  </div>
</div>
</template>
<script>
  import AppHeader from '../components/app-header.vue'
  import ListCentent from '../components/list-centent.vue'
  import Discuss from '../components/discuss.vue'
  import HotTop from '../components/hot-top.vue'
  import NearbyTruck from '../components/nearby-truck.vue'
  import News from '../components/news.vue'
  import Confirm from '../components/confirm.vue'
  import MyManage from '../components/my-manage.vue'
  import OtherManage from '../components/other-manage.vue'
  import SuperManage from '../components/super-manage.vue'
  import ToPost from '../components/to-post.vue'
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const modal = weex.requireModule('modal')
  const dom = weex.requireModule('dom')
  export default {
    components: { AppHeader, ListCentent ,Discuss,HotTop,NearbyTruck,News,MyManage,OtherManage,SuperManage,Confirm,ToPost},
    computed: {
      // 热门新闻
      hotTab () {return this.$store.state.hotTab},
      user () {return this.$store.state.user},
      showManage () {return this.$store.state.changeManage},
      showconfirm () {return this.$store.state.confirm},
    },
    data () {
      return {
        title:'',
        refreshing: false,
        source:'home',
        hotPage:2,        //热门页码 
        loading:true,
        listend:false,
        refreshing: false,
        showConfirm:false,
        index:0,
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
          if (uid=='undefined') {
            storage.setItem('uid','0')
          }else if(uid == '0'){
            this.$store.dispatch('GET_HIS',{uid:`0`,avatar:''})
          }else{
            storage.getItem('avatar', event => {
              this.$store.dispatch('GET_HIS',{uid:`${uid}`,avatar:`${event.data}`})
            })
          }
          // storage.setItem('uid','35124')
      })
      if(this.hotTab.DATA.length==0){
          var json={type:"ajax",version:"6",}
          this.$store.dispatch('GET_HOT',json)
      }
    },
    mounted(){
      if (this.hotTab.top!=0) {
          this.GoToBack()
        }
    },
    methods: {
      onrefresh (event) {
        this.refreshing = true
        var json={type:"ajax",version:"6"},
            _this=this;
        XHR.getHotList(json).then( function (res) {
              // modal.alert({message: 'This is a alert'})
               _this.hotTab.DATA= res.data.log;
               _this.refreshing = false

            })
      },
      onpullingdown (event) {
        console.log('is onpulling down')
      },
      GoToBack () {
        var index=this.hotTab.top
        let el = this.$refs['item'+ index][0]
        dom.scrollToElement(el, {})
      },
      moreHot(){                                      //滚动加载更多热门
          var json={type:"ajax",version:"6",page:this.hotPage,nextpagetoken:this.hotTab.nextpagetoken}
          var _this=this;
          if (this.loading) {
            this.loading=false
            XHR.getHotList(json).then( function (res) {
                var data= res.data.log;
                for (var i = 0; i < data.length; i++) {
                  _this.hotTab.DATA.push(data[i])
                }
                if (res.data.nextpagetoken==undefined||res.data.nextpagetoken=="" ) {
                  _this.loading=false
                  _this.listend=true
                }else{
                   _this.loading=true
                }
                _this.hotTab.nextpagetoken=res.data.nextpagetoken
                _this.hotPage++
            })
          }
      },
      ondisappear(index){
         var json={type:'hot',top:index}
         this.$store.dispatch('GOTOBACK',json)
      }
    }
  }
</script>


<style scoped>
.wrapper{background-color: #f7f9fa;flex: 1;}
.hot-scroller{flex:1;}
.flow-btn{position: absolute;right: 36px;bottom: 126px;z-index: 5;}
.flow-icon{width: 108px;height: 112px;}
.row{padding-bottom: 20px;background-color:#FAFBFC;}
.refresh{justify-content: center;align-items: center;padding-top: 20px;padding-bottom: 20px;}
.loading-wrap{justify-content: center;align-items: center;height: 88px;padding-top: 0;flex-direction: row;}
.list-end{justify-content: center;align-items: center;height: 88px;padding-top: 0}
</style>
