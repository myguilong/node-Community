<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  mounted() {
        //首次进入去判断是否有登录
        if(this.$route.fullPath!='/login'){
          this.axios.get(`${this.host}/login/getUser`).then(res=>{console.log(res)})
        }
  }
}
</script>
<style>

</style>
