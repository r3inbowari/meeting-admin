<template>
  <div>
    <my-upload
      field="img"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="showUpload"
      :width="300"
      :height="300"
      url="picbed/user/avatar"
      img-format="png"
      withCredentials
      :headers="headers"
    ></my-upload>

    <v-card class="nav-avatar" style="margin-bottom:10px" width="300" tile>
      <v-img height="100%" :src="avatarSrc">
        <v-row align="end" class="fill-height">
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="title">{{
                  username
                }}</v-list-item-title>
                <v-list-item-subtitle>{{ role }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
    </v-card>

    <div class="my-2">
      <v-btn @click="showUp" color="primary">修改头像</v-btn>
    </div>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import { getToken } from "@/libs/util";
export default {
  components: {
    myUpload,
  },
  data() {
    return {
      showUpload: false,
      headers: {
        Authorization: "",
      },
      avatarSrc: "",
      username: "",
      uid: "",
      sex: "",
      role: "",
      status: "",
    };
  },
  methods: {
    showUp() {
      this.showUpload = true;
      this.headers.Authorization = "Bearer " + getToken();
    },
    cropSuccess() {},
    cropUploadSuccess() {
      this.getAvatar();
    },
    cropUploadFail() {},
    getAvatar() {
      this.http
        .get("api/user/avatar")
        .then((res) => {
          this.avatarSrc = "data:image/png;base64," + res.data.data;
          // 更新父节点路由avatar
          this.$root.myEvent.$emit("update:avatar", this.avatarSrc);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getAvatar();
    this.username = this.$root.accountInfo.username;
    this.uid = this.$root.accountInfo.uid;
    this.sex = this.$root.accountInfo.sex;
    this.role = this.$root.accountInfo.role;
    this.status = this.$root.accountInfo.status;
  },
};
</script>

<style scoped>
.nav-avatar {
}
</style>
