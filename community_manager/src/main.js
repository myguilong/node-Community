import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import AMap from 'vue-amap';
Vue.config.productionTip = false
Vue.use(AMap);
  // 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '474d31d29e87d15a9584920045956ef4',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});
Vue.use(ViewUI)
// Vue.prototype.host = "http://106.14.173.159:8089"
Vue.prototype.host = "http://localhost:8089"
router.beforeEach((to, from, next) => {
  let userdata = localStorage.getItem('user_data')
  if(to.meta.auth){
    if(userdata){
      next()
    }else{
      alert('您未登录')
      next({
        path: "/login"
      });
    }
  }else
  {
    store.commit('setNowRouter',from.fullPath)
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
