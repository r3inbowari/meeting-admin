/* eslint-disable vue/no-parsing-error */
<template>
  <div class="nav-login" :style="loginbg">
    <v-hover close-delay="100" v-slot:default="{ hover }">
      <v-card
        :elevation="hover ? 16 : 2"
        :loading="cardLoading"
        class="nav-login-center"
        :padding="0"
        :bordered="false"
      >
        <v-img src="@/assets/login-fg.png" height="600px"></v-img>
        <div class="nav-login-form">
          <div style="text-align:center;">
            <p class="display-1">904会议系统</p>
          </div>
          <div style="margin-top:20px">
            <v-form ref="loginForm" v-model="loginFormValid">
              <v-text-field
                v-model="loginForm.uid"
                :counter="12"
                :rules="uidRules"
                prepend-inner-icon="mdi-account"
                label="账号"
                required
              ></v-text-field>

              <v-text-field
                v-model="loginForm.password"
                :rules="passwordRules"
                label="密码"
                prepend-inner-icon="mdi-key"
                :append-icon="showLoginPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showLoginPassword ? 'text' : 'password'"
                @click:append="showLoginPassword = !showLoginPassword"
                required
              ></v-text-field>

              <v-checkbox v-model="checkbox" label="记住密码"></v-checkbox>

              <v-btn
                style="width:40%; margin-right:20%"
                :min-width="10"
                color="success"
                class="login-btn"
                :loading="loginLoading"
                @click="onLogin"
              >
                登录
              </v-btn>

              <v-btn
                style="width:40%"
                :min-width="10"
                class="reg-btn"
                @click="regDialog = true"
              >
                注册
              </v-btn>
            </v-form>
          </div>
          <div style="margin-top:20px">
            <h4 style="color:gray">可视化版本: {{ visualVersion }}</h4>
            <h4 style="color:gray">服务版本: {{ serviceVersion }}</h4>
          </div>
        </div>
      </v-card>
    </v-hover>

    <div class="nav-login-footer">
      904 会议系统 | 学习交流 QQ(34787894)
      <br />
      Copyright © 2017 - 2020 r3inbowari. All Rights Reserved.
    </div>

    <v-snackbar
      v-model="loginSnackbar"
      :timeout="3000"
      :color="snackbarColor"
      top
    >
      {{ snackbarText }}
      <v-btn text @click="loginSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <!-- 注册对话框 -->
    <v-dialog v-model="regDialog" width="400">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
          >用户注册申请</v-card-title
        >

        <v-card-text style="margin-top:20px">
          <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
            您的申请将会被审核, 请耐心等待!
          </v-alert>

          <v-form
            style="width:70%;margin-left:auto;margin-right:auto"
            ref="regForm"
            v-model="loginFormValid"
          >
            <v-text-field
              v-model="regForm.username"
              :rules="usernameRules"
              label="用户名"
              required
            ></v-text-field>

            <v-text-field
              v-model="regForm.uid"
              :counter="12"
              :rules="uidRules"
              label="账号"
              required
            ></v-text-field>

            <v-text-field
              v-model="regForm.password"
              :rules="passwordRules"
              label="密码"
              required
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="succees" text @click="onCloseRegDialog">取消</v-btn>
          <v-btn color="primary" text @click="onReg">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regDialog: false,
      // 提示框
      loginSnackbar: false,
      snackbarColor: "blue",
      snackbarText: "message",

      // 版本信息
      visualVersion: "v1.0.1 2020.05.10",
      serviceVersion: "获取中...",

      // 账号密码
      showLoginPassword: false,
      checkbox: true,
      loginFormValid: true,

      // 两个loading
      loginLoading: false,
      cardLoading: true,
      // 背景
      loginbg: {
        backgroundImage: "url(" + require("@/assets/login-bg.png") + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
      loginForm: {
        uid: "",
        password: "",
      },
      uidRules: [
        (v) => !!v || "你还没有填写账号呀",
        (v) => (v && v.length <= 12 && v.length > 4) || "账号长度为5-12位",
      ],
      passwordRules: [(v) => !!v || "你没输入密码么?"],
      usernameRules: [
        (v) => !!v || "你还没有填写用户名呀",
        (v) => (v && v.length <= 16 && v.length > 3) || "账号长度为3-16位",
      ],
      regForm: {
        username: "",
        uid: "",
        password: "",
      },
    };
  },
  methods: {
    onCloseRegDialog() {
      this.regDialog = false;
      this.resetForm("regForm");
    },
    onReg() {
      if (this.validate("regForm")) {
        this.axios
          .post("api/reg", this.regForm)
          .then((res) => {
            console.log(res.data.code);
            if (res.data.code === 4) {
              this.snackbarText = "注册失败, 已经存在的用户名";
              this.snackbarColor = "red";
              this.loginSnackbar = true;
            } else {
              this.snackbarText = "注册成功, 正在等待审核";
              this.snackbarColor = "succees";
              this.loginSnackbar = true;
              this.regDialog = false;
            }
            this.resetForm("regForm");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    validate(target) {
      return this.$refs[target].validate();
    },
    resetForm(target) {
      return this.$refs[target].reset();
    },
    onLogin() {
      if (this.validate("loginForm")) {
        this.loginLoading = true;
        this.axios
          .post("api/login", this.loginForm)
          .then((res) => {
            console.log(res);
            this.loginLoading = false;
            this.snackbarText = "登陆成功";
            this.snackbarColor = "blue";
            this.loginSnackbar = true;
          })
          .catch((err) => {
            console.log(err);
            this.loginLoading = false;
            this.snackbarText = "账号或密码错误, 请重新填写!";
            this.snackbarColor = "red";
            this.loginSnackbar = true;
            this.resetForm("loginForm");
          });
      }
    },
    getVersion() {
      this.axios
        .get("api/serviceVersion", this.loginForm)
        .then((res) => {
          this.serviceVersion = res.data.data.version + " " + res.data.data.tag;
        })
        .catch((err) => {
          console.log(err);
          this.serviceVersion = "获取失败, 请检查服务!";
        });
    },
  },
  mounted() {
    setTimeout(() => {
      this.cardLoading = false;
    }, 2500);
    this.getVersion();
  },
};
</script>

<style scoped>
.nav-login {
  height: 100%;
}

.nav-login-center {
  position: absolute;
  background-color: #fff;
  left: 50%;
  top: 50%;
  margin-left: -500px;
  margin-top: -280px;
  width: 1000px;
  height: 580px;
  overflow: hidden;
  z-index: 3;
}

/* .nav-login-bg {
  text-align:center;
  position:absolute;
  z-index:1;
} */

.nav-login-form {
  position: absolute;
  z-index: 2;
  right: 8%;
  top: 15%;
  width: 27%;
  height: 70%;
}

.nav-login-footer {
  text-align: center;
  position: absolute;
  left: 50%;
  bottom: 2%;
  margin-left: -200.74px;
}
</style>
