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
     console.log('刷新')
        //首次进入去判断是否有登录
        this.axios.get(`${this.host}/login/getUser`).then(res=>{
          console.log(res)
        })
  }
}
</script>
<style>
.allWrap{
}
</style>
