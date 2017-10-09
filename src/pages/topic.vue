<template>
<div class="wrapper">
  <div><title :title="title"></title></div>
  <list class="list" @loadmore="loadmore" loadmoreoffset="100">
    <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
     <image style="width:160px;height:60px;" src="https://s.kcimg.cn/test/trucknew/images/tau.gif"></image>
    </refresh>
    <cell v-for="item in topic">
      <more-discuss :discuss="item"></more-discuss>
    </cell>
    <cell>
        <div class="loading-wrap" v-if="!listend"><text class="loading">正在加载中...</text></div>
        <div class="list-end" v-if="listend"><text>已经到底了</text></div>
    </cell>  
  </list>
</div>
</template>

<script>
  import XHR from '../api'
  import MoreDiscuss from '../components/more-discuss.vue'
  import Title from '../components/title.vue'
  const modal = weex.requireModule('modal')
  export default {
    components: { MoreDiscuss ,Title},
    data () {
      return {
        refreshing: false,
        loading:true,
        topic:[],
        page:2,
        title:'更多热议',
        listend:false,
      }
    },
    created (e) {
       let _this=this
        XHR.GetAllTopic().then( function (res) {
          _this.topic=res.data.topic
        })
    },
    methods: {
      onrefresh (event) {
        this.refreshing = true
        var _this=this;
        XHR.GetAllTopic().then( function (res) {
          _this.topic=res.data.topic
          _this.refreshing = false
        }) 
      },
      onpullingdown (event) {
        console.log('is onpulling down')
      },
      loadmore(e){
          let _this=this
          if (this.loading) {
            this.loading=false
            XHR.GetAllTopic({"page":this.page}).then( function (res) {
                var top = res.data.topic
                for (var i = 0; i < top.length; i++) {
                  _this.topic.push(top[i]) 
                }
                _this.page++
                if (top.length==0||top.length<15) {
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
    .wrapper{background-color:#f7f9fa;}
    .loading-wrap{justify-content: center;align-items: center;height: 88px;padding-top: 0}
    .list-end{justify-content: center;align-items: center;height: 88px;padding-top: 0}
    .refresh{justify-content: center;align-items: center;padding-top: 20px;padding-bottom: 20px;}
</style>
