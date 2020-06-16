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
Vue.use(common)
Vue.use(Vant);
Vue.config.productionTip = false
// Vue.prototype.host = "http://106.14.173.159:8089"
Vue.prototype.host = "http://localhost:8089"
router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook}
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
