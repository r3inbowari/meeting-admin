import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// ali iconfont
import './assets/iconfont.js'
import './assets/icon.css'

Vue.use(VueAxios, axios)
// Vue.use(ViewUI)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
