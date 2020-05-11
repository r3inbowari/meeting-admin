import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// ali iconfont
import './assets/iconfont.js'
import './assets/icon.css'

import http from './libs/http.js'
Vue.prototype.http = http // axios原型

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
