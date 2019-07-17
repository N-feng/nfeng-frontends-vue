import { login, signup } from '@/api/auth'
import { getRoleDetail } from '@/api/role'
import router from '@/router'
import {
  getToken,
  setToken,
  removeToken,
  getName,
  setName,
  setRoleName,
  getRoleName,
  removeRoleName,
} from '@/utils/auth'

const auth = {
  state: {
    token: getToken(),
    username: getName(),
    roleName: getRoleName(),
    menus: [],
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload
    },
    SET_NAME: (state, payload) => {
      state.username = payload
    },
    SET_ROLENAME: (state, payload) => {
      state.roleName = payload
    },
    SET_MENUS: (state, payload) => {
      state.menus = router.options.routes.filter(item => payload.roleMenu.some(ele => ele === item.meta.title))
    },
  },
  actions: {
    // 注册
    SignUp({ commit }, userInfo) {
      return signup(userInfo.username, userInfo.password, 'member').h_then(({ data }) => {
        setToken(data.token)
        setName(data.username)
        setRoleName(data.roleName)
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.username)
        commit('SET_ROLENAME', data.roleName)
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return login(userInfo.username, userInfo.password).h_then(({ data }) => {
        setToken(data.token)
        setName(data.username)
        setRoleName(data.roleName)
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.username)
        commit('SET_ROLENAME', data.roleName)
      })
    },
    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token)
    //       .then(() => {
    //         commit('SET_TOKEN', '')
    //         commit('SET_USERID', '')
    //         commit('SET_NAME', '')
    //         removeName()
    //         removeToken()
    //         removeInnerUser()
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        removeRoleName()
        resolve()
      })
    },
    // 获取菜单
    getMenus({ commit }) {
      getRoleDetail(getRoleName()).h_then(({ data }) => {
        commit('SET_MENUS', data)
        // 过滤一级栏目
      })
    },
  },
}

export default auth
