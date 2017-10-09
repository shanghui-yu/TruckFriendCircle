<template>
  <div> 
    <list class="pro-box" @loadmore="loadmore" loadmoreoffset="100">
      <cell v-for="(item, index) in news">
         <my-news :news="item"></my-news>
      </cell>
    </list>
  </div>
</template>

<script>
  import MyNews from '../components/my-news.vue'
  import XHR from '../api'
  export default {
    components: { MyNews },
    data () {
      return {
        loading:true,       //滚动加载
        page:2,             //页码
        clientHeight:'',
        news:[]
      }
    },
    created() {
          var _this=this;
          XHR.News().then( function (res) {
              _this.news=res.data.message
          })
    },
    methods: {
      loadmore(){
        let _this=this
      }
    }
  }
</script>

<style scoped>
  .top{flex-direction: row;margin-top: 40px;margin-bottom: 12px;}
  .back{font-family: iconfont;color: #fff;font-size: 30px;}
  .set{text-align: right;font-family: iconfont;color: #fff;font-size: 30px;}
  .user-header{height: 300px;position: relative;padding-left: 30px;padding-right: 30px;z-index: 1}
  .header-bg{position: absolute;top:0;right: 0;left: 0;bottom: 0;z-index: -1;}
  .text{color: #fff;font-size: 28px;line-height: 44px;}
  .user{flex-direction: row;}
  .user-avater{width: 110px;height: 110px;border-top-left-radius:55px;
      border-top-right-radius:55px;
      border-bottom-left-radius:55px;
      border-bottom-right-radius:55px;margin-bottom: 24px;}
  .follow{flex: 1;align-items: center;}
  .fans{flex: 1;align-items: center;}
  .me{flex: 1;align-items: center;justify-content: center;}
  .row{padding-bottom: 20px;background-color:#FAFBFC;}
</style>
