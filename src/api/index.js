import axios from 'axios'
import contents from './contents'
import auth from './auth'
import thread from './thread'
import response from './response'
import store from '@/store'

const client = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    'Api-Token': process.env.HWD_API_TOKEN,
    'Api-Secret-Key': process.env.HWD_API_SECRET_KEY,
  },
})

client.interceptors.request.use((config) => {
  store.commit('setLoading', true)
  return config
}, (error) => {
  return Promise.reject(error)
})

client.interceptors.response.use((response) => {
  store.commit('setLoading', false)
  return response
}, (error) => {
  store.commit('setLoading', false)
  if (error.response.status === 401) {
    store.commit('loggedOut')
    window.alert('ログインしてください')
    window.alert(process.env.TEST_TEST)
  }
  return Promise.reject(error)
})

client.auth = auth(client)
client.contents = contents(client)
client.thread = thread(client)
client.response = response(client)
client.install = function (Vue) {
  Object.defineProperty(Vue.prototype, '$request', {
    get () {
      return client
    },
  })
}

export default client
