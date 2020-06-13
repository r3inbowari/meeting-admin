<template>
  <div class="apply">
    <v-snackbar v-model="applySnackbar"
                :timeout="3000"
                :color="snackbarColor"
                top>
      {{ snackbarText }}
      <v-btn text
             @click="applySnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-text-field v-model="rid"
                  :counter="36"
                  label="教室ID"
                  required></v-text-field>
    <v-text-field v-model="content"
                  :counter="20"
                  label="会议内容"
                  required></v-text-field>
    <v-text-field v-model="start"
                  :counter="23"
                  label="开始时间"
                  required></v-text-field>
    <v-text-field v-model="end"
                  :counter="23"
                  label="结束时间"
                  required></v-text-field>

    <div class="my-2">
      <v-btn small
             @click="onApply"
             color="error">提交申请</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      end: '2020-06-11T8:10:00.000Z',
      rid: 'c51e456c-f6f4-4869-b688-bb72d64aaa52',
      start: '2020-06-11T7:10:00.000Z',
      content: '实例',
      snackbarColor: "red",
      snackbarText: '',
      applySnackbar: false
    }
  },
  methods: {
    onApply () {
      if (this.end !== '' && this.rid !== '' && this.start !== '' && this.content !== '') {
        this.http.post("api/apply", { end: this.end, rid: this.rid, start: this.start, content: this.content })
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              console.log("apply done...");
              this.snackbarText = '申请成功'
              this.applySnackar = true
            }
            if (res.data.code === 6) {
              this.snackbarText = '已占用的时间区间'
              this.applySnackbar = true
            }
          })
          .catch((err) => {

            console.log(err);
          });
      }
    }
  }
}
</script>
<style scoped>
.apply {
  margin-top: 50px;
  height: 200px;
}
</style>
