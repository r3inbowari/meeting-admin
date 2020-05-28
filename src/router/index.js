import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/UserLogin";
import Home from "@/components/Home";
import Dash from "@/components/Dash";
import Iot from "@/components/Iot";
import AccountAudit from "@/components/UserAudit";
import Index from "@/components/Index";
import Account from "@/components/UserCenter";
import Apply from "@/components/Apply";

Vue.use(Router);

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      meta: {
        requireAuth: true,
      },
      redirect: "/home/dash",
      component: Home,
      children: [
        {
          path: "dash",
          component: Dash,
        },
        {
          path: "apply",
          component: Apply,
        },
        {
          path: "iot",
          component: Iot,
        },
        {
          path: "account-audit",
          component: AccountAudit,
        },
        {
          path: "account",
          component: Account,
        },
      ],
    },
  ],
});
