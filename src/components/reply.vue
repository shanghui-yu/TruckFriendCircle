<template>
  <div class="comment" @click="comentName.reply(comment.username,comment.aid)">
         <div class="comment-list">
            <div class="header">
              <image :src="comment.avatar" class="avatar"></image>
              <div class="name">
                <text class="name-text">{{comment.username}}</text>
                <image class="grade" :src="'https://s.kcimg.cn/test/trucknew/images/greade'+comment.userlevel+'.png'"></image>
              </div>
              <div><text class="time">{{time}}</text></div>
              <div v-if="comment.uid==user.uid" class="delete-wrap" @click="deleteanswer(comment.aid)"><text class="delete">删除</text></div>
            </div>
            <div class="content">
              <div v-if="comment.commentId!=detailAid" class="answer"><text>回复：</text><text style="color:#2062A9">{{comment.pusername}}</text></div>
              <text class="content-text">{{comment.content}}</text>
            </div>
         </div>
  </div>
</template>

<style scoped>
.comment{background-color: #fff;padding-left: 30px;}
.comment-list{padding-top: 30px;padding-bottom: 30px;padding-right: 30px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #e5e5e5;}
.header{flex-direction: row;align-items: center;justify-content: center;}
.avatar{width: 60px;height: 60px;
      border-top-left-radius:30px;
      border-top-right-radius:30px;
      border-bottom-left-radius:30px;
      border-bottom-right-radius:30px;
  margin-right: 20px;}
.name{flex: 1;flex-direction: row;}
.grade{width:60px;height:30px;margin-top:9px;margin-left:10px;}
.name-text{font-size: 32px;color: #2062A9;}
.time{font-size: 24px;color: #999;}
.delete{color: #2062A9;font-size: 24px;}
.content{margin-top: 20px;}
.content-text{font-size: 32px;line-height: 42px;color: #666;}
.answer{flex-direction: row;}
.delete-wrap{margin-left: 20px;justify-content: center;height: 60px;}
</style>

<script>
  import XHR from '../api'
  const storage = weex.requireModule('storage')
  const modal = weex.requireModule('modal')
  export default {
    props:["comment","comentName","index","commentList"],
    data () {
      return {
        time:'',
        detailAid:''
      }
    },
    computed: {
      user () {return this.$store.state.user},
    },
    created(){
      this.detailAid=weex.config.bundleUrl.match(/aid=(\w+)/)[1]
      storage.getItem('uid', event => {
        this.$store.dispatch('GET_HIS',{uid:`${event.data}`})
      })
      var now = new Date().getTime(),past = this.comment.uptime*1000,
          time=(now-past)/1000, _this=this;
          if (time > 0 && time < 60) {
              _this.time='刚刚'
          }else if(time > 60 && time < 3600){
              _this.time=parseInt(time/60)+'分钟前'
          }else if(time >= 3600 && time < 3600*24){
              _this.time=parseInt(time/3600)+'小时前'
          }else if(time >=3600*24 && time < 3600*48){
              _this.time='1天前'
          }else if(time >=3600*48 && time < 3600*72){
              _this.time='2天前'
          }else if(time >=3600*72 && time < 3600*96){
              _this.time='3天前'
          }else if(time >=3600*96 && time < 3600*120){
              _this.time='4天前'
          }else if(time >=3600*120 && time < 3600*144){
              _this.time='5天前'
          }else{
             // _this.time= new Date(past).format('MM-dd')
                _this.uptime= new Date(past).toLocaleDateString().replace(/\//g, "-");
          } 
    },
    methods: {
        deleteanswer(aid){
          var _this=this;
          XHR.deleteanswer({"aid":aid}).then(function(){
              _this.commentList.splice(_this.index,1)
              modal.toast({ message: '删除成功', duration: 1 })
          })
      }
    }
  }
</script>
