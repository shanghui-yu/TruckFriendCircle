<template>
  <div @androidback="back">
    <div><app-header></app-header></div>
    <router-view style="flex:1"></router-view>
  </div>
</template>
<script>
  import AppHeader from './components/app-header.vue'
  export default {
    created(){
        var domModule = weex.requireModule('dom');
        domModule.addRule('fontFace',{
            'fontFamily':'iconfont',
            'src':"url(\'http://at.alicdn.com/t/font_qv5etitfumtb7qfr.ttf\')"
        })
    },
    components: {AppHeader},
    methods: {
      back: function () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

</style>
