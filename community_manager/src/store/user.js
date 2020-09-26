import { sign,permission } from '../utils/request'
const state = {
    token: '',
    roles: [], // 用户角色
    userMail:'' || localStorage.getItem('userMail')
};

const mutations = {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_USERMAIL: (state, mail) => {
            state.userMail = mail
        }
 };
const actions = {
    // user login
    sign({ commit },userIfno){
        return new Promise((reslove,reject)=>{
            sign(userIfno).then(res=>{
                const {data:{code,data,userMail}} = res
                if(code!=0){
                    reject()
                }else{
                    commit('SET_USERMAIL',userMail)
                    localStorage.setItem("userMail",userMail)
                    localStorage.setItem("user_data", data);
                    reslove()
                }

            })
        })
    },
    getInfo({ commit, state }) {
        //获取登录用户的权限
        return new Promise(resolve => {
            permission().then(res=>{

            })
            // setTimeout(() => {
            //     const roles = state.token === "admin" ? ["admin"] : ["editor"];
            //     commit("SET_ROLES", roles);
            //     resolve({ roles });
            // }, 200);
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
