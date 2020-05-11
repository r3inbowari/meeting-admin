<template>
  <v-app>
    <v-navigation-drawer
      color="blue"
      :expand-on-hover="true"
      :mini-variant="true"
      :mini-variant-width="66"
      :permanent="true"
      width="200"
      :value="true"
      app
      replace
      @transitionend="hello"
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="false && 'px-0'">
          <v-list-item-avatar>
            <img src="@/assets/default-avatar.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>我的名字</v-list-item-title>
            <v-list-item-subtitle>学生</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider style="margin-bottom:10px"></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.ref"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div style="text-align:center;" v-show="versionShow">
          <v-list-item-title>debugger v1.0.1-develop2</v-list-item-title>
        </div>
      </template>
      <!-- </v-card> -->
    </v-navigation-drawer>

    <v-app-bar app dense>
      主页
      <v-spacer></v-spacer>
      <v-chip class="ma-2" color="indigo" text-color="white">
        <v-avatar left>
          <v-icon>account_box</v-icon>
        </v-avatar>
        个人中心
      </v-chip>
      <v-chip @click="onLogout" class="ma-2" color="primary" text-color="white">
        <v-avatar left>
          <v-icon>exit_to_app</v-icon>
        </v-avatar>
        退出
      </v-chip>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-content>

    <v-footer style="background:#007ACC" app> </v-footer>
  </v-app>
</template>

<script>
import { getToken, delToken } from "@/libs/util";

export default {
  data() {
    return {
      items: [
        { title: "主页", icon: "mdi-view-dashboard", ref: "/home/dash" },
				{ title: "物联网", icon: "settings_system_daydream", ref: "/home/iot" },
				{ title: "日程表", icon: "date_range", ref: "/home/iot2" },
				{ title: "课室申请", icon: "event_note", ref: "/home/iot3" },
        { title: "课室审核", icon: "assignment_turned_in", ref: "/home/dash4" },
				{ title: "账号审核", icon: "assignment_turned_in", ref: "/home/iot5" },
				{ title: "设置", icon: "settings_applications", ref: "/home/io6t" },
        { title: "关于", icon: "mdi-help-box", ref: "/home/io5t" },
      ],
      background: false,
      drawer: true,
      versionShow: false,
    };
  },
  methods: {
    hello() {
      this.versionShow = !this.versionShow;
    },
    onLogout() {
      delToken();
      this.$router.push({
        name: "Login",
      });
    },
  },
  beforeMount() {
    this.axios.interceptors.request.use((config) => {
      let token = getToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      } else {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
      return config;
    });

    this.axios
      .get("api/reg", this.loginForm)
      .then((res) => {
        this.serviceVersion = res.data.data.version + " " + res.data.data.tag;
        this.cardLoading = false;
        this.pullVersionLoading = false;
      })
      .catch((err) => {
        console.log(err);
        this.serviceVersion = "获取失败, 请检查服务!";
        this.cardLoading = false;
        this.pullVersionLoading = false;
      });
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    },
  },
  mounted() {
    // this.$router.push("/home/dash");
  },
};
</script>
