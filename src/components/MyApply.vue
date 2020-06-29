<template>
  <div>
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
              <v-col>
                <div class="title-clu">会议名称
                  <div class="title-addr">地点</div>
                </div>
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
                      <v-subheader inset>文件列表</v-subheader>

                      <v-list-item v-for="item in myapplyfiles"
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
                          <v-btn icon>
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

                      <v-list-item v-for="item in items2"
                                   :key="item.title">
                        <v-list-item-avatar>
                          <v-icon :class="itemfileiconclass"
                                  v-text="itemfileicon"></v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title v-text="item.title"></v-list-item-title>
                          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-btn icon>
                            <v-icon color="grey lighten-1">mdi-download</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>

                    <v-footer absolute>
                      <v-col class="text-center"
                             cols="12">
                        <v-pagination v-model="page"
                                      :length="filePageSum"></v-pagination>
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

export default {
  data () {
    return {
      lefticon: "mdi-clock",
      page: 1,

      // file current page
      filePage: 1,
      // file sumup pages
      filePageSum: 0,
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
      myapplys: [],
      myapplyfiles: [],
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
      itemfileicon: "assignment"
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
          this.filePageSum = parseInt(this.myapplyfiles.length / 4 + this.myapplyfiles.length % 4);
        })
        .catch(err => {
          console.log(err);
        })
    },
    onSwitchApply (val) {
      if (val != this.item) {
        let applyid = this.myapplys[val].id
        this.getApplyFile(applyid);
      }
    },
    firstFetch (val) {
      let applyid = this.myapplys[val].id
      this.getApplyFile(applyid);
    }
  },
  mounted () {
    this.getMyApplyList();
    // console.log(parseInt(6 / 4));

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