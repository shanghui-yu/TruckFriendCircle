<template>
  <div class="wrapper">
      <div>
        <div class="tab-nav">
          <div class="nav-li" @click="tabAllNav(1)">
            <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/new-select.png"></image>
          </div>
          <div class="nav-li" @click="tabAllNav(2)">
            <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/video-btn.png"></image>
          </div>
          <div class="nav-li" @click="tabAllNav(3)">
            <image class="nav-icon" src="https://s.kcimg.cn/test/trucknew/images/follow-btn.png"></image>
          </div>
        </div>
        <list @loadmore="morenew" loadmoreoffset="50" class="slide">
          <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
             <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
          </refresh>
          <cell v-for="(item,index) in newTab.DATA" class="row" keep-scroll-position="true" :ref="'item'+index" @appear="ondisappear(index)">
            <list-centent :wrapcenter="item" :source="source" :index="index" :discuss="newTab.DATA"></list-centent>
          </cell>
          <cell>
              <div class="loading-wrap" v-if="!listend"><text class="loading">正在加载中...</text></div>
              <div class="list-end" v-if="listend"><text>已经到底了</text></div>
          </cell>  
        </list>
      </div>
      <to-post :source="pullSource" :aid="aid" :title="title"></to-post>
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
  const modal = weex.requireModule('modal')
  const dom = weex.requireModule('dom')
  export default {
    components: { ListCentent,Confirm,MyManage,OtherManage,SuperManage,ToPost},
    computed: {
      newTab () {return this.$store.state.newTab},
      user () {return this.$store.state.user},
      showManage () {return this.$store.state.changeManage},
      showconfirm () {return this.$store.state.confirm}
    },
    data () {
      return {
        title:'',
        refreshing: false,
        source:'home',
        pullSource:'news',  
        loading:true,
        listend:false,
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
      var newData=this.$store.state.newTab
      if(newData.DATA.length==0){
        var json={type:"ajax"} 
          this.$store.dispatch('GET_ALL_NEW',json)
      }
    },
    mounted(){
      if (this.newTab.top!=0) {
          this.GoToBack()
        }
    },
    methods: {
      onrefresh (event) {
        this.refreshing = true
        var _this=this
        XHR.getAllNew({type:"ajax"}).then( function (res) {
          _this.newTab.DATA=res.data.log 
          _this.newTab.startid=res.data.startid
          _this.refreshing = false
        })
      },
      onpullingdown (event) {
        console.log('is onpulling down')
      },
      GoToBack () {
        var index=this.newTab.top
        let el = this.$refs['item'+ index][0]
        dom.scrollToElement(el, {})
      },
      ondisappear(index){
         var json={type:'new',top:index}
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
      morenew(){                                      //滚动加载更多最新
        var json={type:"ajax",startid:`${this.newTab.startid}`}
          var _this=this
          if (this.loading) {
            _this.loading=false
            XHR.getAllNew(json).then( function (res) {
                var data= res.data.log
                _this.newTab.startid=res.data.startid
                for (var i = 0; i < data.length; i++) {
                  _this.newTab.DATA.push(data[i])
                }
                if (res.data.startid==undefined||res.data.startid=="" ) {
                  _this.loading=false
                  _this.listend=true
                }else{
                   _this.loading=true
                }
            })
          }
      },
    }
  }
</script>


<style scoped>
.wrapper{background-color: #f7f9fa;flex:1;}
.refresh-text{color: #888888;font-size: 24px;text-align: center;}
.slide{flex:1;}
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
