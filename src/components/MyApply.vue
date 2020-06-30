<template>
  <div>
    <v-snackbar v-model="appSnackbar"
                top
                :timeout="3000">
      {{ appSnackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink"
               text
               v-bind="attrs"
               @click="appSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="dialog"
              hide-overlay
              persistent
              width="300">
      <v-card color="primary"
              dark>
        <v-card-text>
          上传中
          <v-progress-linear indeterminate
                             color="white"
                             class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addDialog"
              persistent
              max-width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">添加与会人员</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="addForm"
                        v-model="formValid">
                  <v-text-field label="姓名"
                                v-model="joinName"
                                :rules="joinNameRules"
                                required></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"
                 text
                 @click="addDialog = false">取消</v-btn>
          <v-btn color="blue darken-1"
                 text
                 @click="onAddPerson">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row style="height:100%">
      <v-col :cols="3">
        <v-card class="mx-auto"
                style="height:660px; overflow:hidden"
                tile>
          <vue-scroll :ops="ops">
            <v-list nav>
              <v-subheader>
                <div style="font-weight: 900; font-size:18px">我的申请(最近30天)</div>
              </v-subheader>

              <v-list-item-group v-model="item"
                                 color="primary">
                <v-list-item v-for="(item, i) in myapplys"
                             :key="i"
                             @click="onSwitchApply(i)">
                  <v-list-item-icon>
                    <v-icon v-text="lefticon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.content"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>

            </v-list>
          </vue-scroll>
        </v-card>
      </v-col>

      <v-col :cols="9">
        <v-card class="right-panel">
          <vue-scroll :ops="ops">
            <div class="child-dom"></div>

            <v-row>
              <v-col :cols="2">
                <v-card style="margin-left: 20px"
                        width="90"
                        height="90">
                  <div style="background: rgb(243,66,95); height:25px; border-bottom-left-radius: 0; border-bottom-right-radius: 0;"></div>
                </v-card>
              </v-col>
              <v-col :cols="6">
                <div class="title-clu">{{myapplys[item].content }}
                  <div class="title-addr">906会议室</div>
                </div>
              </v-col>
              <v-col :cols="2">
                <Upload style="margin-top:10px"
                        :headers="headers"
                        :on-success="uploadSucceed"
                        :on-error="uploadFailed"
                        :before-upload="uploadPre"
                        :show-upload-list="false"
                        :action="currentApplyIDUpload">
                  <Button icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
              </v-col>

              <v-col :cols="2">
                <Button style="margin-top:10px"
                        icon="ios-cloud-upload-outline"
                        @click="addDialog = true">添加人员</Button>

              </v-col>
            </v-row>

            <!-- 内容 -->
            <div class="ac-content">

              <v-card>
                <v-tabs background-color="primary"
                        color="deep-blue accent-4"
                        right>
                  <v-tab>文件</v-tab>
                  <v-tab>人员</v-tab>

                  <v-tab-item style="height: 430px">

                    <v-list two-line
                            subheader>
                      <v-subheader inset>文件列表
                      </v-subheader>

                      <v-list-item v-for="item in myapppyfileschunk[filePage - 1]"
                                   :key="item.id">
                        <v-list-item-avatar>
                          <v-icon :class="itemfileiconclass"
                                  v-text="itemfileicon"></v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title v-text="item.name"></v-list-item-title>
                          <div style="color: rgb(188,192,196); font-size: 14px">{{item.create | dateformat('YYYY-MM-DD HH:mm:ss')}}</div>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-btn @click="onDownload(item.id)"
                                 icon>
                            <v-icon color="grey lighten-1">mdi-download</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>

                    <v-footer absolute>
                      <v-col class="text-center"
                             cols="12">
                        <v-pagination v-model="filePage"
                                      :length="filePageSum"></v-pagination>
                      </v-col>

                    </v-footer>
                  </v-tab-item>

                  <v-tab-item style="height: 430px">

                    <v-list two-line
                            subheader>
                      <v-subheader inset>参会人员</v-subheader>

                      <v-list-item v-for="item in myapppyjoinchunk[joinPage - 1]"
                                   :key="item.id">
                        <v-list-item-avatar>
                          <v-icon :class="itemfileiconclass"
                                  v-text="itemfileicon1"></v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title v-text="item.name"></v-list-item-title>
                          <!-- <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle> -->
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-btn @click="onDelPerson(item.id)"
                                 icon>
                            <v-icon color="grey lighten-1">mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>

                    <v-footer absolute>
                      <v-col class="text-center"
                             cols="12">
                        <v-pagination v-model="joinPage"
                                      :length="joinPageSum"></v-pagination>
                      </v-col>

                    </v-footer>
                  </v-tab-item>
                </v-tabs>
              </v-card>

            </div>

          </vue-scroll>
        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import { getToken } from "@/libs/util";

export default {
  data () {
    return {
      addDialog: false,
      currentApplyIDUpload: "",
      dialog: false,
      appSnackbar: false,
      appSnackbarText: "",
      currentApplyID: "",
      headers: {
        Authorization: ""
      },
      lefticon: "mdi-clock",
      page: 1,

      // file current page
      filePage: 1,
      // file sumup pages
      filePageSum: 1,
      length: 3,
      ops: {
        rail: {
          opacity: 10,
          step: 180,
          mousedownStep: 30,
          background: "#fff"
        },
        bar: {
          background: "#cecece"
        }
      },
      item: 0,
      myapplys: [
        {
          content: ''
        }
      ],
      myapplyfiles: [],
      myapppyfileschunk: [],
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
      ],
      // max 4 per page
      items2: [
        { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary2', subtitle: 'Jan 20, 2014' },
        { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel2', subtitle: 'Jan 10, 2014' },
        { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
        { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel3', subtitle: 'Jan 10, 2014' },
      ],
      itemfileiconclass: "amber white--text",
      itemfileicon1: "person",
      itemfileicon: "assignment",





      // ========================================================
      myapplyjoins: [],
      myapppyjoinchunk: [],
      joinPageSum: 1,
      joinPage: 1,
      joinName: '',
      joinNameRules: [
        (v) => !!v || "你还没有填写名字呀",
        (v) => (v && v.length < 12) || "太长了, 谢谢",
      ],
      formValid: true,

    }
  },
  methods: {
    getMyApplyList () {
      this.http
        .get("api/applym")
        .then((res) => {
          console.log(res.data.data);
          this.myapplys = res.data.data;
          if (this.myapplys.length > 0) {
            this.firstFetch(0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @param id apply_id
     */
    getApplyFile (id) {
      this.http
        .get("api/meeting/filenames/" + id)
        .then(res => {
          console.log(res.data.data);
          this.myapplyfiles = res.data.data;
          // 分页计算
          if (this.myapplyfiles.length === 0) {
            this.filePageSum = 1;
          } else {
            this.filePageSum = parseInt((this.myapplyfiles.length + 3) / 4);
          }
          this.myapppyfileschunk = this._.chunk(this.myapplyfiles, 4);
          console.log(this.myapppyfileschunk);

        })
        .catch(err => {
          console.log(err);
        })
    },
    onSwitchApply (val) {
      if (val != this.item) {
        this.myapppyfileschunk.length = 0;
        this.filePage = 1;
        this.filePageSum = 1;
        this.currentApplyID = this.myapplys[val].id
        this.currentApplyIDUpload = "filebed/meeting/file/" + this.currentApplyID;
        this.getApplyFile(this.currentApplyID);

        this.myapppyjoinchunk.length = 0;
        this.joinPage = 1;
        this.joinPageSum = 1;
        this.getApplyJoin(this.currentApplyID);

      }
    },
    firstFetch (val) {
      this.currentApplyID = this.myapplys[val].id
      this.currentApplyIDUpload = "filebed/meeting/file/" + this.currentApplyID;
      this.getApplyFile(this.currentApplyID);
      this.getApplyJoin(this.currentApplyID);
    },
    uploadSucceed (response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.getApplyFile(this.currentApplyID);
      this.dialog = false;
      this.appSnackbarText = "上传成功";
      this.appSnackbar = true;
    },
    uploadFailed (error, file, fileList) {
      console.log(error);
      console.log(file);
      console.log(fileList);
      this.dialog = false;
      this.appSnackbarText = "上传失败";
      this.appSnackbar = true;
    },
    uploadPre (file) {
      console.log(file);
      this.dialog = true;
    },

    // ==================================start========================================



    Dig2Dec (s) {
      let retV = 0;
      if (s.length == 4) {
        for (let i = 0; i < 4; i++) {
          retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
        }
        return retV;
      }
      return -1;
    },



    Hex2Utf8 (s) {
      let retS = "";
      let tempS = "";
      let ss = "";
      if (s.length == 16) {
        tempS = "1110" + s.substring(0, 4);
        tempS += "10" + s.substring(4, 10);
        tempS += "10" + s.substring(10, 16);
        let sss = "0123456789ABCDEF";
        for (let i = 0; i < 3; i++) {
          retS += "%";
          ss = tempS.substring(i * 8, (eval(i) + 1) * 8);
          retS += sss.charAt(this.Dig2Dec(ss.substring(0, 4)));
          retS += sss.charAt(this.Dig2Dec(ss.substring(4, 8)));
        }
        return retS;
      }
      return "";
    },
    Dec2Dig (n1) {
      let s = "";
      let n2 = 0;
      for (let i = 0; i < 4; i++) {
        n2 = Math.pow(2, 3 - i);
        if (n1 >= n2) {
          s += '1';
          n1 = n1 - n2;
        }
        else
          s += '0';
      }
      return s;
    },

    Str2Hex (s) {
      let c = "";
      let n;
      let ss = "0123456789ABCDEF";
      let digS = "";
      for (let i = 0; i < s.length; i++) {
        c = s.charAt(i);
        n = ss.indexOf(c);
        digS += this.Dec2Dig(eval(n));
      }
      return digS;
    },
    Gb2312ToUtf8 (s1) {
      let s = escape(s1);
      let sa = s.split("%");
      let retV = "";
      if (sa[0] != "") {
        retV = sa[0];
      }
      for (let i = 1; i < sa.length; i++) {
        if (sa[i].substring(0, 1) == "u") {
          retV += this.Hex2Utf8(this.Str2Hex(sa[i].substring(1, 5)));
          if (sa[i].length) {
            retV += sa[i].substring(5);
          }
        }
        else {
          retV += unescape("%" + sa[i]);
          if (sa[i].length) {
            retV += sa[i].substring(5);
          }
        }
      }
      return retV;
    },
    Utf8ToGb2312 (str1) {
      let substr = "";
      let a = "";
      let b = "";
      let c = "";
      let i = -1;
      i = str1.indexOf("%");
      if (i == -1) {
        return str1;
      }
      while (i != -1) {
        if (i < 3) {
          substr = substr + str1.substr(0, i - 1);
          str1 = str1.substr(i + 1, str1.length - i);
          a = str1.substr(0, 2);
          str1 = str1.substr(2, str1.length - 2);
          if (parseInt("0x" + a) & 0x80 == 0) {
            substr = substr + String.fromCharCode(parseInt("0x" + a));
          }
          else if (parseInt("0x" + a) & 0xE0 == 0xC0) { //two byte
            b = str1.substr(1, 2);
            str1 = str1.substr(3, str1.length - 3);
            let widechar = (parseInt("0x" + a) & 0x1F) << 6;
            widechar = widechar | (parseInt("0x" + b) & 0x3F);
            substr = substr + String.fromCharCode(widechar);
          }
          else {
            b = str1.substr(1, 2);
            str1 = str1.substr(3, str1.length - 3);
            c = str1.substr(1, 2);
            str1 = str1.substr(3, str1.length - 3);
            let widechar = (parseInt("0x" + a) & 0x0F) << 12;
            widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
            widechar = widechar | (parseInt("0x" + c) & 0x3F);
            substr = substr + String.fromCharCode(widechar);
          }
        }
        else {
          substr = substr + str1.substring(0, i);
          str1 = str1.substring(i);
        }
        i = str1.indexOf("%");
      }

      return substr + str1;
    },

    // =================================end=========================================

    onDownload (id) {
      console.log("down...: ", id);
      // window.location.href = ? 


      this.http
        .download("api/meeting/file/" + id)
        .then(res => {
          console.log(res.data.headers);

          // let fileName = res.headers['content-disposition'].split('=')[1];
          let fileNameH = res.headers['content-disposition'];
          let fileName = "";
          let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          let matches = filenameRegex.exec(fileNameH);
          if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, '');
          }

          console.log(decodeURI(fileName));
          let blob = new Blob([res.data]);
          console.log(blob);

          const a = document.createElement("a")
          a.href = URL.createObjectURL(blob)
          a.download = decodeURI(fileName)
          a.click()
          URL.revokeObjectURL(a.href)
          a.remove();

          // let objectUrl = URL.createObjectURL(blob);
          // window.location.href = objectUrl;
          // window.open(objectUrl, '_blank')
        })
        .catch(err => {
          console.log(err);

        })
    },

    // =================================start join in============================================


    onDelPerson (id) {
      this.http
        .delete("api/apply/join/" + id)
        .then(res => {
          console.log(res);
          this.getApplyJoin(this.currentApplyID);
          this.appSnackbarText = "删除成功";
          this.appSnackbar = true;
        })
    },

    onAddPerson () {

      if (this.$refs["addForm"].validate()) {
        console.log("add...");
        this.http
          .post("api/apply/join", { aid: this.currentApplyID, name: this.joinName })
          .then(res => {
            console.log(res);
            this.addDialog = false;
            this.$refs["addForm"].reset();
            this.getApplyJoin(this.currentApplyID);
            this.appSnackbarText = "添加成功";
            this.appSnackbar = true;
          })
      }


    },

    /**
     * @param id apply_id
     */
    getApplyJoin (id) {
      this.http
        .get("api/apply/join/" + id)
        .then(res => {
          console.log(res.data.data);
          this.myapplyjoins = res.data.data;
          this.myapppyjoinchunk = this._.chunk(this.myapplyjoins, 4);
          // 分页计算
          if (this.myapplyjoins.length === 0) {
            this.joinPageSum = 1;
          } else {
            this.joinPageSum = parseInt((this.myapplyjoins.length + 3) / 4);
          }
          console.log("join tag", this.myapppyjoinchunk);
          // this.myapppyfileschunk = this._.chunk(this.myapplyfiles, 4);


        })
        .catch(err => {
          console.log(err);
        })
    },





















    // ================================= end  join in============================================
  },
  mounted () {
    this.headers.Authorization = "bearer " + getToken();
    this.getMyApplyList();
  }
}
</script>
  
<style scoped>
.right-panel {
  max-height: 660px;
  padding-top: 20px;
  overflow: hidden;
}

.title-clu {
  margin-left: 20px;
  margin-top: 20px;
  font-size: 28px;
  color: rgb(188, 192, 196);
  font-weight: 700;
}

.title-addr {
  font-size: 16px;
  font-weight: 350;
}

#action {
  background: rgb(240, 242, 245);
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 20px;
  height: 60px;
}

.ac-content {
  background: rgb(240, 242, 245);
  margin: 15px;
  max-height: 500px;
  padding: 10px;
}
.detail {
  height: 150px;
}

.file {
  margin-top: 20px;
  height: 200px;
}

.join {
  height: 300px;
}
</style>