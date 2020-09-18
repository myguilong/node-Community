import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'index',
        redirect: {
            path: '/index'
        }
    },
  {
    path: '/index',
    name: 'index',
    meta:{
        login:false,
        showMenu:true,
        isKeep:true
      },
    component:() => import('../views/index.vue')
  },
    {
        path: '/cart',
        name: 'cart',
        meta:{
          login:true,
          showMenu:true,
          isKeep:false
        },
        component: () => import( '../views/cart.vue')
    },
    {
        path: '/category',
        name: 'category',
        meta:{
            showMenu:true,
            isKeep:true,
            login:false
          },
        component: () => import('../views/category.vue')
    },
    {
        path: '/foodsDetail/:id',
        name: 'foodsDetail',
        props: true,
        meta:{
            login:false,
          isKeep:false
        },
        component: () => import('../views/foodsDetail.vue')
    }, {
        path: '/userCenter',
        name: 'userCenter',
        meta:{
            login:true,
            showMenu:true,
            isKeep:false
        },
        component: () => import('../views/userCenter.vue')
    },{
        path:'/login',
        name:'login',
        meta:{
          showMenu:false,
          isKeep:false
        },
        component: () => import('../views/login.vue')
    },
    {
        path:'/setHeader',
        name:'申请团长',
        meta:{
            showMenu: false,
            isKeep: true,
            login:true
        },
        component:()=>import('../views/setHeader.vue')
    },
    {
        path:'/mapLocation',
        name:'地图选址',
        meta:{
            showMenu: false,
            isKeep: false
        },
        component:()=>import('../views/mapLocation')
    },
    {
        path:'/selectLeader',
        name:'选择收货团长',
        meta:{
            showMenu: false,
            isKeep: true,
            login:true
        },
        component:()=>import('../views/selectLeader.vue')
    }
]
const router = new VueRouter({routes})
export default router
