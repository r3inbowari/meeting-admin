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
      :src="background"
      replace
      @transitionend="hello"
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="false && 'px-0'">
          <v-list-item-avatar>
            <img :src="avatarSrc" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              $root.accountInfo.username
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              $root.accountInfo.role | parseRole
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider style="margin-bottom:10px"></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.ref"
          @click="itemChange(item.title)"
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

    <v-app-bar
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      app
      dense
    >
      {{ homeTitle }}
      <v-spacer></v-spacer>
      <v-chip @click="onAccount" class="ma-2" color="indigo" text-color="white">
        <v-avatar left>
          <v-icon>account_box</v-icon>
        </v-avatar>
        个人中心
      </v-chip>
      <v-chip @click="onLogout" class="ma-2" color="primary" text-color="white">
        <v-avatar @click="showIconUp = true" left>
          <v-icon>exit_to_app</v-icon>
        </v-avatar>
        退出
      </v-chip>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content style="background: rgb(255,249,245)">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-content>

    <v-footer style="background:#007ACC; height:16px; padding:0px" app>
      <v-row>
        <v-col cols="12">
          <div style="color:white">
            <v-chip
              @click="github"
              color="#007ACC"
              style="position: absolute; top:0px"
              pill
              label
              x-small
              ><div style="color: white">
                v1.0.5 beta4(b223d5..df223ea) master auto-deloy
              </div></v-chip
            >
          </div>
        </v-col>

        <v-col cols="1">
          <v-menu min-width="200px" open-on-hover top offset-y>
            <template v-slot:activator="{ on }">
              <v-chip
                v-on="on"
                color="#007ACC"
                style="position: absolute; top:0px; right:90px"
                pill
                label
                x-small
                ><div style="color: white">
                  <v-icon style="top:-1px" small>mdi-email</v-icon>信息
                </div></v-chip
              >
            </template>

            <v-list>
              <v-list-item v-for="(item, index) in 3" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-divider
          style="position: absolute; top:0px; right:90px"
          vertical
        ></v-divider>
        <v-col cols="1">
          <div style="color:white">
            <v-chip
              @click="feedbackDialog = true"
              color="#007ACC"
              style="position: absolute; top:0px; right:1px"
              pill
              label
              x-small
              ><div style="color: white">
                <v-icon style="top:0px" small>feedback</v-icon>问题反馈
              </div></v-chip
            >
          </div>
        </v-col>
      </v-row>

      <v-divider vertical></v-divider>
    </v-footer>

    <v-dialog v-model="feedbackDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">问题反馈</v-card-title>
        <v-card-text>
          <v-textarea
            label="填写你遇到的问题"
            clearable
            v-model="feedback"
            hint="100个字以内"
          ></v-textarea>
          <v-container fluid> </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="feedbackDialog = false"
            >取消</v-btn
          >
          <v-btn color="green darken-1" text @click="onFeedback">发送</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { delToken, checkhome } from "@/libs/util";

export default {
  filters: {
    parseRole(str) {
      if (str === "role") {
        return "管理员";
      } else {
        return "学生";
      }
    },
  },
  data() {
    return {
      // feedback
      feedback: "",
      feedbackDialog: false,
      // 头像
      avatarSrc: "",
      showIconUp: false,
      items: [
        { title: "主页", icon: "mdi-view-dashboard", ref: "/home/dash" },
        { title: "物联网", icon: "settings_system_daydream", ref: "/home/iot" },
        { title: "日程表", icon: "date_range", ref: "/home/iot2" },
        { title: "课室申请", icon: "event_note", ref: "/home/iot3" },

        { title: "设置", icon: "settings_applications", ref: "/home/io6t" },
        { title: "关于", icon: "mdi-help-box", ref: "/home/io5t" },
      ],
      background: "",
      drawer: true,
      versionShow: false,
      homeTitle: "主页",
    };
  },
  methods: {
    // 问题反馈
    onFeedback() {
      this.http
        .post("api/feedback", { content: this.feedback })
        .then(() => {
          console.log("feedback done...");
          this.feedbackDialog = false;
          this.feedback = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    github() {
      window.open("https://github.com/r3inbowari/meeting-admin");
    },
    // 侧边改变
    itemChange(t) {
      this.homeTitle = t;
    },
    onAccount() {
      this.homeTitle = "个人中心";
      this.$router.push({
        path: "/home/account",
      });
    },
    hello() {
      this.versionShow = !this.versionShow;
    },
    onLogout() {
      delToken();
    },
    getAvatar() {
      this.http
        .get("api/user/avatar")
        .then((res) => {
          this.avatarSrc = "data:image/png;base64," + res.data.data;
          console.log("home -> avatar loading ok");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    bg() {
      this.background = "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg";
    },
  },
  beforeCreate() {
    checkhome();
  },
  beforeMount() {
    this.bg();
    this.$root.myEvent.$on("update:title", function(msg) {
      that.homeTitle = msg;
      console.log("router event: title");
    });

    this.http
      .get("api/login")
      .then((res) => {
        this.$root.accountInfo = res.data.data;
        console.log(res.data.data);
        if (res.data.data.role === "manager") {
          this.items.push(
            {
              title: "账号审核",
              icon: "assignment_turned_in",
              ref: "/home/account-audit",
            },
            {
              title: "课室审核",
              icon: "assignment_turned_in",
              ref: "/home/dash4",
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    let that = this;
    this.$root.myEvent.$on("update:avatar", function(msg) {
      that.avatarSrc = msg;
      console.log("router event: center -> home");
    });
    this.getAvatar();
  },
  mounted() {},
};
</script>
