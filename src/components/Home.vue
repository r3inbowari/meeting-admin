<template>
  <div>
    <v-btn style="width:40%" :min-width="10" class="reg-btn" @click="onLogout">
      退出
    </v-btn>
  </div>
</template>

<script>
import { getToken, delToken } from "@/libs/util";

export default {
  methods: {
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
};
</script>
