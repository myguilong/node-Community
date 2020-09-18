import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Notify } from 'vant';
import 'amfe-flexible'
import 'vant/lib/index.css';
import common from "./common/common";
import axios from './plugins/axios'
Vue.use(common)
Vue.use(Vant);
Vue.config.productionTip = false
// Vue.prototype.host = "http://106.14.173.159:8089"
Vue.prototype.host = "http://localhost:8089"

// let web_userData = localStorage.getItem('web_userData')
// if (web_userData) {
//   axios.get('/webUser/userInfo').then(res => {
//     const {data: {data: infoData}} = res
//     store.commit('setUserData', infoData.user)
//   }).catch(err=>{
//     console.log(err)
//     this.$notify({
//       message:'登录信息已经过期',
//       type:"danger"
//     })
//     setTimeout(()=>{
//       this.$router.push({
//         path:'/login'
//       })
//     },1200)
//
//   })
// }

router.beforeEach((to, from, next) => {
  let user_data = localStorage.getItem('web_userData')
  if(to.meta.login){
    if(user_data){
      next()
    }else{
      Notify('你未登录');
      next('/login')
    }
  }else{
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
