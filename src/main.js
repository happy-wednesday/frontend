// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import api from './api'
import store from './store'
import sanitizeHTML from 'sanitize-html'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(api)
Vue.prototype.$sanitize = sanitizeHTML

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})
