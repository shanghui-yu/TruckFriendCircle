<template>
  <div class="wraper">
      <div class="header">
          <image src="https://s.kcimg.cn/test/trucknew/images/topbg.png" class="topbg"></image>
          <text class="back" @click="back">&#xe6d6;</text>
          <div class="header-content"> 
              <image :src="img" class="avatar"></image> 
              <div class="info">
                 <div class="title">
                   <div style="flex:1"><text class='title-text'>＃{{topic.title}}＃</text></div>
                   <text class="people-num">共{{topic.ac}}人参与</text>
                 </div>
                 <div>
                   <text class="describe">{{topic.content}}</text>
                 </div>
              </div>
          </div>
      </div>
      <list class="container" @loadmore="loadmore" loadmoreoffset="50">
        <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
         <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
        </refresh>
        <cell v-for="(item , index) in log" class="list">
          <list-centent :wrapcenter="item" :source="source" :index="index" :discuss="log"></list-centent>
        </cell>
        <cell class="list">
            <div class="loading-wrap" v-if="!listend">
              <text class="loading">正在加载中</text>
            </div>
            <div class="list-end" v-if="listend">
              <text>已经到底了</text>
            </div>
        </cell>
      </list>
      <to-post :source="source" :aid="aid" :title="topic.title"></to-post>
      <div><my-manage v-if="showManage=='me'"></my-manage></div>
      <div><other-manage v-if="showManage=='ather'"></other-manage></div>
      <div><super-manage v-if="showManage=='super'"></super-manage></div>
      <div><confirm v-if="showconfirm"></confirm></div>
  </div>
</template>
<script>
  import XHR from '../api'
  import ListCentent from '../components/list-centent.vue'
  import Confirm from '../components/confirm.vue'
  import MyManage from '../components/my-manage.vue'
  import OtherManage from '../components/other-manage.vue'
  import SuperManage from '../components/super-manage.vue'
  import ToPost from '../components/to-post.vue'
  var modal = weex.requireModule('modal')
  const storage = weex.requireModule('storage')
  var navigator = weex.requireModule('navigator')
  export default {
    components: { ListCentent,MyManage,OtherManage,SuperManage,Confirm,ToPost},
    computed: {
      showManage () {return this.$store.state.changeManage},
      showconfirm () {return this.$store.state.confirm},
      user () {return this.$store.state.user}
    },
    data () {
      return {
        refreshing: false,
        loading: true,
        source:'discuss',     //来源
        topic:{},             //话题信息
        log:[],               //话题列表
        img:'',
        page:2,
        listend:false,
        aid:''
      }
    },
    created(){
      var _this=this;
          this.aid=weex.config.bundleUrl.match(/aid=(\w+)/)[1];
           XHR.discussDetail ({"aid":this.aid}).then( function (res) {
                   _this.topic=res.data.topic  
                   _this.log=res.data.log  
                   _this.img= _this.topic.img  
                   if (_this.log.length<15) {
                      _this.loading= false
                      _this.listend=true
                   }
            }) 
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
      onrefresh (event) {
        this.refreshing = true
        var _this=this;
        XHR.discussDetail ({"aid":this.aid}).then( function (res) {
             _this.topic=res.data.topic  
             _this.log=res.data.log  
             _this.img= _this.topic.img  
             if (_this.log.length<15) {
                _this.loading= false
                _this.listend=true
             }
             _this.refreshing = false
          }) 
      },
      onpullingdown (event) {
        console.log('is onpulling down')
      },
      loadmore(){
        var _this=this;
        if (this.loading) {
          this.loading=false
          XHR.discussDetail ({"aid":this.aid,'page':this.page}).then( function (res) {
             var data= res.data.log
             for (var i = 0; i < data.length; i++) {
               _this.log.push(data[i])
             }
             _this.page++
             if (data.length<15) {
                _this.loading=false
                _this.listend=true
             }else{
                _this.loading=true
             }
          })  
        }
      },
      back: function () {
        navigator.pop({
          animated: "true"
        }, event => {
            console.log(1)
        })
      },
    }
  }
</script>
<style scoped>
.wraper{background-color: #fff;flex:1;}
.header{position: relative;height: 240px;}
.topbg{height: 160px;position: absolute;top:0;left: 0;right: 0;}
.header-content{position: absolute;top:110px;flex-direction: row;left: 30px;right: 30px;}
.avatar{width: 100px;height: 100px;border-top-left-radius:5px;
      border-top-right-radius:5px;
      border-bottom-left-radius:5px;
      border-bottom-right-radius:5px;margin-right: 10px;}
.info{flex: 1;}
.container{flex:1;}
.back{font-family: iconfont;font-size: 36px;color: #fff;position: absolute;left: 46px;top:20px;}
.title{flex-direction: row;margin-bottom: 12px;}
.title-text{font-size: 32px;line-height: 48px;color: #fff;}
.people-num{font-size: 24px;line-height: 36px;color: #fff;margin-top: 12px;}
.describe{font-size: 24px;line-height: 36px;color: #666;}
.list{border-top-style: solid;border-top-color:#f7f9fa;border-top-width: 20px; }
.loading-wrap{justify-content: center;align-items: center;height: 88px;padding-top: 0}
.list-end{justify-content: center;align-items: center;height: 88px;padding-top: 0}

.refresh{justify-content: center;align-items: center;padding-top: 20px;padding-bottom: 20px;}
</style>
