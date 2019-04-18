import Vue from 'vue'
import Vuex from 'vuex'
import client from '@/api'

Vue.use(Vuex)

const state = {
  contents: [],
  thread: [],
  response: [],
  tree_response: [],
  mydata: [],
  isLoggedIn: false,
  loading: false,
  dialog: false,
}

const mutations = {
  fetchData (state, payload) {
    state.contents = payload
  },
  fetchThread (state, payload) {
    state.thread = payload
  },
  fetchResponse (state, payload) {
    const tree_algo = (i, depth,tree) => {
      for(const j of payload.thread){
        if(i.anchorChild.includes(j.id)){
          j.depth=depth + 1
          tree.push(j)
          tree_algo(j, j.depth,tree)
        }
      }
    }
    state.tree_response = []
    for(const i of payload.thread){
      if(i.anchorParent.length === 0){
        const tree = []
        i.depth=0
        tree.push(i)
        tree_algo(i, i.depth,tree)
        state.tree_response.push(tree)
      }
    }
    state.response = payload
  },
  loggedIn (state, token) {
    state.isLoggedIn = true
    client.defaults.headers.common['Authorization'] = `JWT ${token}`
    localStorage.setItem('token', token)
  },
  loggedOut (state) {
    state.isLoggedIn = false
    delete client.defaults.headers.common['Authorization']
    localStorage.clear()
  },
  fetchMyData (state, payload) {
    state.mydata = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setDialog (state, payload) {
    state.dialog = payload
  },
}

const actions = {
  fetchDataAsync ({commit}, payload) {
    return client.contents.list(payload.offset).then(res => {
      commit('fetchData', res.data.results)
    })
  },
  fetchThreadAsync ({commit}, payload) {
    return client.thread.list(payload.offset).then(res => {
      commit('fetchThread', res.data.results)
    })
  },
  fetchResponseAsync ({commit}, payload) {
    return client.thread.one(payload).then(res => {
      commit('fetchResponse', res.data)
    })
  },
  login ({dispatch, commit}, [email, password]) {
    return client.auth.login(email, password).then((res) => {
      commit('loggedIn', res.data.token)
      dispatch('fetchMyDataAsync')
      return res
    })
  },
  logout ({commit}) {
    commit('loggedOut')
  },
  tryLoggedIn ({commit}) {
    const token = localStorage.getItem('token')
    if (token) {
      commit('loggedIn', token)
    }
  },
  signup ({dispatch}, [email, password]) {
    return client.auth.register(email, password).then(res => {
      dispatch('login', [email, password])
    })
  },
  fetchMyDataAsync ({commit}, payload) {
    return client.auth.mypage().then(res => {
      commit('fetchMyData', res.data)
    })
  },
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
})
