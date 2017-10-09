var navigator = weex.requireModule('navigator')
export default {
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
        console.log(to)
      }
    },
    back () {
        if (this.$router) {
            this.$router.back()
        }
    },
    skip (url) {
        navigator.push({
          url: "https://s.kcimg.cn/test/trucknew/"+url,
          animated: 'true'
        }, event => {
          console.log(1)
        })
    }
  }
}
