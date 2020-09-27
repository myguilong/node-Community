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
// 通用页面

export const constRoutes = [
    {
        path: "/login",
        component: () => import("@/views/login"),
        hidden: true // 导航菜单忽略该项
    }
];
export const asyncRoutes = [
    {
        path: "/main",
        component: main,
        redirect:'/main/categoryList',
        children: [
            {
                path: 'categoryEdit',
                name: '添加分类',
                component: categoryEdit,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            },
            {
                path: 'categoryEdit/:id',
                name: '分类编辑',
                component: categoryEdit,
                props: true,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            },
            {
                path: 'categoryList',
                name: "分类列表",
                component: categoryList,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor','nuser']
                }
            }, {
                path: 'foodsEdit',
                name: '商品添加',
                component: foodsEdit,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            }, {
                path: 'adBanner',
                name: '添加广告',
                component: adBanner,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            }, {
                path: 'adList',
                name: '广告管理',
                component: adList,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            }, {
                path: 'foodsEdit/:id',
                name: '商品编辑',
                component: foodsEdit,
                props: true,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            }, {
                path: 'foodsList',
                name: "商品列表",
                component: foodsList,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            },
            {
                path: 'leaderManager',
                name: '团长管理',
                component: leaderManager,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            },
            {
                path: 'leaderApply',
                name: '团长申请',
                component: leaderApply,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            },
            {
                path: 'userManagerList',
                name: '系统管理员列表',
                component: userManagerList,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            },
            {
                path: 'userList',
                name: '用户列表',
                component: userList,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            },
            {
                path: 'mapLocation',
                name: '地图定位',
                component: mapLocation,
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                }
            }

        ]
    }
];
export default new VueRouter({
    mode:'hash',
    routes: constRoutes
});

