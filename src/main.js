import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
// ali iconfont
import "./assets/iconfont.js";
import "./assets/icon.css";

// scroll
import vuescroll from "vuescroll";

// moment.js
import moment from 'moment';
// zhcn
moment.locale('zh-cn');
Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

// lodash import
import _ from "lodash";
Vue.prototype._ = _;

Vue.use(vuescroll, {

})

import http from "./libs/http.js";
Vue.prototype.http = http; // axios原型

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  data () {
    return {
      myEvent: new Vue(),
      accountInfo: {},
      cmd: [],
      infoLog: (content) => {
        this.cmd.push({
          type: "INFO",
          content: content,
          color: "secondary",
        });
      },
      warnLog: (content) => {
        this.cmd.push({
          type: "WARN",
          content: content,
          color: "#FF9933",
        });
      },
      errorLog: (content) => {
        this.cmd.push({
          type: "ERROR",
          content: content,
          color: "red",
        });
      },
    };
  },
  render: (h) => h(App),
}).$mount("#app");
