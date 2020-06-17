import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import main from '../views/main.vue'
import categoryEdit from '../views/categoryEdit.vue'
import categoryList from '../views/categoryList.vue'
import foodsEdit from '../views/foodsEdit.vue'
import foodsList from '../views/foodsList.vue'
import adBanner from '../views/adBanner.vue'
import adList from '../views/adList.vue'
import leaderManager from '../views/leaderManager.vue'
import leaderApply from '../views/leaderApply.vue'
import mapLocation from '../views/mapLocation.vue'
import userManagerList from '../views/userManageList.vue'
import userList from '../views/userList.vue'
Vue.use(VueRouter)
export default new VueRouter({
    mode:'hash',
    routes:[
          {
            path: "/login",
            name: "login",
            component:login,
            meta: {
     
            }
          },
          {
              path:"/main",
              name:"main",
              component:main,
              meta:{
                  auth:true
              },
              children:[
                  {
                      path:'/main/categoryEdit',
                      name:'添加分类',
                      component:categoryEdit   
                  },
                  {
                    path:'/main/categoryEdit/:id',
                    name:'分类编辑',
                    component:categoryEdit,
                    props:true   
                },
                  {
                      path:'/main/categoryList',
                      name:"分类列表",
                      component:categoryList
                  },{
                      path:'/main/foodsEdit',
                      name:'商品添加',
                      component:foodsEdit
                  },{
                    path:'/main/adBanner',
                    name:'添加广告',
                    component:adBanner
                  },{
                      path:'/main/adList',
                      name:'广告管理',
                      component:adList
                  },{
                      path:'/main/foodsEdit/:id',
                      name:'商品编辑',
                      component:foodsEdit,
                      props:true
                  },{
                      path:'/main/foodsList',
                      name:"商品列表",
                      component:foodsList
                  },
                  {
                      path:'/main/leaderManager',
                      name:'团长管理',
                      component:leaderManager
                  },
                  {
                      path:'/main/leaderApply',
                      name:'团长申请',
                      component:leaderApply
                  },
                  {
                      path:'/main/userManagerList',
                      name:'系统管理员列表',
                      component:userManagerList
                  },
                  {
                      path:'/main/mapLocation',
                      name:'地图定位',
                      component:mapLocation
                  },
                  {
                      path:'/main/userList',
                      name:'用户列表',
                      component:userList
                  }
              ]
          },
          {
              path:"/",
              redirect:{
                  path:"/main"
              }
          }

    ]
})