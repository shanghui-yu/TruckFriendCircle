<template>
<div class="wraper">
  <div><title :title="title"></title></div>
  <list @loadmore="loadmore" loadmoreoffset="10" >
      <cell v-for="(item, index) in peoplelist">
        <people :people="item" :peoplelist="peoplelist" :aid='aid'></people>
      </cell>
      <cell v-if="dataNull">
        <data-null :source="this.source"></data-null>
      </cell>
      <cell v-if="!dataNull">
        <div class="loading-wrap" v-if="!listend">
          <text class="loading">正在加载中</text>
        </div>
        <div class="list-end" v-if="listend">
          <text>已经到底了</text>
        </div>
      </cell>  
  </list>
  <div><confirm v-if="showconfirm"></confirm></div>
</div>
</template>

<script>
  import Title from '../components/title.vue'
  import People from '../components/people.vue'
  import DataNull from '../components/data-null.vue'
   import Confirm from '../components/confirm.vue'
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  export default {
    components: { People ,DataNull,Title,Confirm},
    computed: {
      showconfirm () {return this.$store.state.confirm},
    },
    data () {
      return {
        peoplelist:[],
        page:2,
        ok:false,
        loading:true,
        listend:false,
        dataNull:false,
        title:'',
        source:'',
        aid:''
      }
    },
    created() {
       var _this=this;
       this.aid=weex.config.bundleUrl.match(/aid=(\w+)/)[1]
       this.source =weex.config.bundleUrl.match(/source=(\w+)/)[1]
       if (this.source==="1") {
            this.title="点赞的人"
            XHR.Getprise({"aid":this.aid}).then(function(res){
                  _this.peoplelist = res.data.m
                  // modal.alert({message: _this.peoplelist})
                  if (_this.peoplelist.length==0) {
                    _this.dataNull=true
                  }else if(_this.peoplelist.length<20){
                    _this.listend=true
                  }
                  _this.ok=true
            })
       }
       if (this.source==="2") {
              _this.title="关注"
              XHR.Conpeople({"aid":this.aid}).then( function (res) {
              _this.peoplelist=res.data.m
              // modal.alert({message: _this.peoplelist})
              if (_this.peoplelist.length==0) {
                _this.dataNull=true
              }else if(_this.peoplelist.length<20){
                  _this.listend=true
                }
                _this.ok=true
            })
       }
        if (this.source==="3") {
            _this.title="粉丝"
            XHR.fans({"aid":this.aid}).then( function (res) {
                _this.peoplelist=res.data.m
                if (_this.peoplelist.length==0) {
                  _this.dataNull=true
                }else if(_this.peoplelist.length<20){
                  _this.listend=true
                }
                _this.ok=true
            })
       }
    },
    methods: {
      loadmore(){
        let _this=this
        switch(this.source){
          case "2":
              if (_this.loading) {
                  _this.loading=false
                  XHR.Conpeople({"aid":this.aid,"page":this.page}).then( function (res) {
                    let m =res.data.m
                    if (m.length<20||m.length==0){
                      _this.loading=false
                      _this.listend=true
                      for (var i = 0; i < m.length; i++) {
                        _this.peoplelist.push(m[i])
                      }
                    }else{
                      for (var i = 0; i < m.length; i++) {
                        _this.peoplelist.push(m[i])
                      }
                      _this.page++
                      _this.loading=true
                    } 
                  })
              }
            break;
          case "3":
              if (this.loading) {
                  this.loading=false
                  XHR.fans({"aid":this.aid,"page":this.page}).then( function (res) {
                      let m =res.data.m
                      if (m.length<20||m.length==0){
                        _this.loading=false
                        _this.listend=true
                        for (var i = 0; i < m.length; i++) {
                          _this.peoplelist.push(m[i])
                        }
                      }else{
                          for (var i = 0; i < m.length; i++) {
                            _this.peoplelist.push(m[i])
                          }
                          _this.page++
                          _this.loading=true
                      }
                  })
              }
            break;
          case "1":
              if (this.loading) {
                  this.loading=false
                  XHR.Getprise({"aid":this.aid,"page":this.page}).then(function(res){
                    let m =res.data.m
                    if (m==null){
                        _this.loading=false
                        _this.listend=true
                      }else{
                        for (var i = 0; i < m.length; i++) {
                          _this.peoplelist.push(m[i])
                        }
                        _this.page++
                        _this.loading=true
                      }
                  })
              }
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .wraper{flex:1;}
  .top{flex-direction: row;margin-top: 40px;margin-bottom: 12px;}
  .back{font-family: iconfont;color: #fff;font-size: 30px;}
  .set{text-align: right;font-family: iconfont;color: #fff;font-size: 30px;}
  .user-header{height: 300px;position: relative;padding-left: 30px;padding-right: 30px;}
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

  .loading-wrap{justify-content: center;align-items: center;height: 88px;padding-top: 0}
  .list-end{justify-content: center;align-items: center;height: 88px;padding-top: 0}
</style>
