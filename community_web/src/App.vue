<template>
  <div id="app">
    <keep-alive >
        <router-view @setCart="setCart($event)" v-if="$route.meta.isKeep"/>
    </keep-alive>
    <router-view @setCart="setCart($event)" v-if="!$route.meta.isKeep"/>
    <van-tabbar route v-show="$route.meta.showMenu">
      <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="search">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="cart-o" :badge="cartNum">购物车</van-tabbar-item>
      <van-tabbar-item  replace to="/userCenter"  icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cartNum: null
      }
    },
    created() {
      let web_userData = localStorage.getItem('web_userData')
      if (web_userData) {
        this.axios.get('/webUser/userInfo').then(res => {
            const {data: {data: infoData}} = res
            this.$store.commit('setUserData', infoData.user)
          this.$nextTick()
        }).catch(err=>{
          console.log(err)
          this.$notify({
            message:'登录信息已经过期',
            type:"danger"
          })
          setTimeout(()=>{
            this.$router.push({
              path:'/login'
            })
          },1200)

        })
      }
      },
    mounted() {
      console.log('mounted')
    },
    methods: {
      setCart(e) {
        console.log('操作购物车')

      }
    }
  }
</script>
<style>
 div,p{
   margin: 0;
   padding: 0;
 }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h4,h5,h3,h2,h1{
  margin: 0;
  padding: 0;
}
</style>
