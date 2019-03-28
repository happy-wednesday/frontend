import axios from 'axios'
import contents from './contents'
import auth from './auth'
import thread from './thread'
import response from './response'

const client = axios.create({
  baseURL: process.env.API_ENDPOINT,
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
