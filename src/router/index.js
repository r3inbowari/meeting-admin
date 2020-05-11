import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/UserLogin";
import Home from "@/components/Home";
import Dash from "@/components/Dash";
import Iot from "@/components/Iot";
import AccountAudit from "@/components/UserAudit";
import Index from "@/components/Index";

Vue.use(Router);

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
      redirect: "/home/dash",
      component: Home,
      children: [
        {
          path: "dash",
          component: Dash,
        },
        {
          path: "iot",
          component: Iot,
        },
        {
          path: "account-audit",
          component: AccountAudit,
        },
      ],
    },
  ],
});
