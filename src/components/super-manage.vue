<template>
     <div class="wrapper" @click="cancel">
        <div class="management" ref="manage" >
          <div class="panel" @click="NoRecommend">
              <text class="managetext">不推荐</text>
          </div>
          <div class="panel" @click="mehi">
              <text class="managetext">自嗨</text>
          </div>
          <div class="panel" @click="deletepost">
              <text class="managetext">删除</text>
          </div>
          <div class="panel" @click="setGag">
              <text class="managetext">禁言</text>
          </div>
          <div class="panel" @click="">
              <text class="managetext">死鬼</text>
          </div>
          <div class="panel cancel" @click="cancel">
              <text class="managetext">取消</text>
          </div>
        </div>
     </div>
</template>

<script>
  const animation = weex.requireModule('animation')
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  import XHR from '../api'
  export default {
    data () {
      return {
      }
    },
    computed: {
      Nowlog () {return this.$store.state.Nowlog},
      user () {return this.$store.state.user}
    },
    methods: {
      move() {                
        var manage = this.$refs.manage;
        animation.transition(manage, {
          styles: {
            transform: 'translate(0px, -310px)',
            transformOrigin: 'center center'
          },
          duration: 300, //ms
          timingFunction: 'ease',
          delay: 0 //ms
        }, function () {
          console.log("执行完回掉")
        })
      },
      cancel(){
          var _this=this,manage = this.$refs.manage;
          animation.transition(manage, {
            styles: {
              transform: 'translate(0px, 310px)',
              transformOrigin: 'center center'
            },
            duration: 300, //ms
            timingFunction: 'ease',
            delay: 0 //ms
          }, function () {
            _this.$store.dispatch('changeManage','')
          })
      },
      deletepost(){                          //删除帖子
          var json={
            m:"dellog",
            aid:this.Nowlog.object.aid,
            uptime:this.Nowlog.object.uptime,
            verify:this.Nowlog.object.aid+this.Nowlog.object.uptime+'dicx4627',
            uid:this.user.uid
          }, _this=this;
          XHR.deletepost(json).then( function (res) {
            if (res.data.status=="0") {
                _this.$store.dispatch('changeManage','')
                _this.Nowlog.Array.splice(_this.Nowlog.index,1)
                modal.toast({ message: '删除成功'})
            } 
          })
      },
      mehi(){                              //自嗨
          var json={
            m:"hai",
            aid:this.Nowlog.object.aid,
            uptime:this.Nowlog.object.uptime,
            verify:this.Nowlog.object.aid+this.Nowlog.object.uptime+'dicx4627',
            uid:this.user.uid
          }, _this=this;
          XHR.mehi(json).then( function (res) {
            if (res.data.status=="0") {
                _this.$store.dispatch('changeManage','')
                _this.Nowlog.Array.splice(_this.Nowlog.index,1)
                modal.toast({ message: '设置成功'})
            } 
          })
      },
      setGag(){                          //禁言
         var json={
            m:"gag",
            gagtime:1 ,
            aid:this.Nowlog.object.aid,
            uptime:this.Nowlog.object.uptime,
            verify:this.Nowlog.object.aid+this.Nowlog.object.uptime+'dicx4627',
            uid:this.user.uid
          }, _this=this;
          XHR.Gag(json).then( function (res) {
            if (res.data.status=="0") {
                 _this.$store.dispatch('changeManage','')
                 modal.toast({ message: '设置成功'})
            } 
          })
      },
      NoRecommend(){                        //不推荐
        var json={
            m:"groom",
            aid:this.Nowlog.object.aid,
            uptime:this.Nowlog.object.uptime,
            verify:this.Nowlog.object.aid+this.Nowlog.object.uptime+'dicx4627',
            uid:this.user.uid
          }, _this=this;
          XHR.Norecommend(json).then( function (res) {
            if (res.data.status=="0") {
                 _this.$store.dispatch('changeManage','')
                 modal.toast({ message: '设置成功'})
            } 
          })
      },
      SetDevil(){                        //不推荐
        var json={
            m:"ghost",
            aid:this.Nowlog.object.aid,
            uptime:this.Nowlog.object.uptime,
            verify:this.Nowlog.object.aid+this.Nowlog.object.uptime+'dicx4627',
            uid:this.user.uid
          }, _this=this;
          XHR.setDevil(json).then( function (res) {
            if (res.data.status=="0") {
                 _this.$store.dispatch('changeManage','')
                 modal.toast({ message: '设置成功'})
            } 
          })
      },
    },
    created(){
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
    mounted(){
      this.move()
    }

  }
</script>
<style scoped>
.wrapper{background-color: rgba(0,0,0,.5);position: fixed;left: 0;right: 0;top:0;bottom: 0;z-index: 10}
.management{position: absolute;bottom: -310px;flex: 1;left: 0;right: 0;}
.panel{height: 100px;background-color: #fff;border-bottom-style: solid;border-bottom-color: #e5e5e5;border-bottom-width: 1px;justify-content: center;align-items: center;}
.cancel{border-top-style: solid;border-top-color: #e5e5e5;border-top-width: 10px;}
.managetext{font-size: 36px;color: #666;}
</style>

