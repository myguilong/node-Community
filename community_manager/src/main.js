import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ViewUI from 'view-design';
import './permission'
import 'view-design/dist/styles/iview.css';
import './utils/jurisdiction'
Vue.config.productionTip = false
  // 初始化vue-amap
Vue.use(ViewUI)
// Vue.prototype.host = "http://106.14.173.159:8089"
Vue.prototype.host = "http://localhost:8089"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
