<template>
<div>
   <div class="prise-wrap" @click="skip(`PeopleList.weex.js?aid=${bbsaid}&source=1`)">
      <text class="prise">&#xe6e9;</text>
      <div class="prise-center">
         <image v-if="index<6" class="prise-avater" :src="item.avatar" v-for="(item,index) in zan" placeholder="https://s.kcimg.cn/test/trucknew/images/avater.png"></image>
      </div>
      <text class="into">全部 &#xe6e6;</text>
  </div>
</div>
 
</template>

<style scoped>
    .prise-wrap{
      height: 100px;
      flex-direction: row;
      align-items: center;
      padding-left: 30px;
      padding-right: 30px;
      background-color: #fff;
    }
    .prise{
      font-family: iconfont;
      font-size: 30px;
      color: #F86B4F;
    }
    .prise-center{
      flex: 1;
      flex-direction: row;
      overflow: hidden;
    }
    .prise-avater{
      width: 60px;
      height: 60px;
      border-top-left-radius:30px;
      border-top-right-radius:30px;
      border-bottom-left-radius:30px;
      border-bottom-right-radius:30px;
      margin-left: 20px;
    }
    .into{color: #999;font-size: 30px;font-family: iconfont}
</style>

<script>
  const storage = weex.requireModule('storage')
  export default {
    props:["zan","bbsaid"],
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
