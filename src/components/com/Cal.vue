<template>
  <div style="height:100%">
    <v-snackbar v-model="snackbar"
                :timeout="3000"
                :color="snackbarColor"
                top>
      {{ snackbarText }}
      <v-btn text
             @click="applySnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-card :loading="carding"
            elevation="4"
            height="100%">
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat
                       color="white">
              <v-btn outlined
                     class="mr-4"
                     color="grey darken-2"
                     @click="setToday">
                快速返回本日
              </v-btn>
              <v-btn fab
                     text
                     small
                     color="grey darken-2"
                     @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab
                     text
                     small
                     color="grey darken-2"
                     @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn outlined
                     class="mr-4"
                     color="grey darken-2"
                     @click="applyRoom">
                申请课室
              </v-btn>
              <v-menu bottom
                      right>
                <template v-slot:activator="{ on }">
                  <v-btn outlined
                         color="grey darken-2"
                         v-on="on">
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>月</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>周</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>四天</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>日</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar ref="calendar"
                        v-model="focus"
                        color="primary"
                        :events="events"
                        :event-color="getEventColor"
                        :now="today"
                        :type="type"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
                        @change="updateRange"></v-calendar>
            <v-menu v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x>
              <v-card color="grey lighten-4"
                      min-width="350px"
                      flat>
                <v-toolbar :color="selectedEvent.color"
                           dark>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <!-- <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn> -->
                </v-toolbar>
                <v-card-text>
                  <span>开始时间: </span><span v-html="selectedEvent.start"></span>
                  <br>
                  <span>结束时间: </span><span v-html="selectedEvent.end"></span>
                  <br>
                  <span>会议内容: </span><span v-html="selectedEvent.details"></span>
                  <br>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text
                         color="primary"
                         @click="selectedOpen = false">
                    关闭
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="appling"
                hide-overlay
                persistent
                width="300">
        <v-card color="primary"
                dark>
          <v-card-text>
            正在提交申请
            <v-progress-linear indeterminate
                               color="white"
                               class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="applyDialog"
                persistent
                max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">会议室申请</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="applyForm"
                      v-model="applyFormValid">
                <v-row>
                  <v-col cols="12">
                    <v-select :items="roomNames"
                              :rules="timeRules"
                              @change="onChangeList"
                              label="会议室"
                              required></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-menu v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="time1"
                                      :rules="timeRules"
                                      label="选择一个日期"
                                      prepend-icon="event"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="time1"
                                     @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="6">
                    <v-menu ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="time2"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="time2"
                                      :rules="timeRules"
                                      label="开始时间"
                                      prepend-icon="access_time"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"></v-text-field>
                      </template>
                      <v-time-picker v-if="menu2"
                                     v-model="time2"
                                     full-width
                                     @click:minute="$refs.menu2.save(time2)"></v-time-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="6">
                    <v-menu ref="menu3"
                            v-model="menu3"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="time3"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="time3"
                                      :rules="timeRules"
                                      label="结束时间"
                                      prepend-icon="access_time"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"></v-text-field>
                      </template>
                      <v-time-picker v-if="menu3"
                                     v-model="time3"
                                     full-width
                                     @click:minute="$refs.menu3.save(time3)"></v-time-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea outlined
                                :rules="contentRules"
                                name="input-7-4"
                                label="会议内容"
                                v-model="applyForm.content"></v-textarea>
                  </v-col>

                </v-row>
              </v-form>
            </v-container>
            <small style="color: red">*请选择一个合适的时间申请，请勿恶意申请，违者将追究责任！</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1"
                   text
                   @click="onApplyCancel">取消</v-btn>
            <v-btn color="blue darken-1"
                   text
                   @click="onApplyPost">提交申请</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // public snackbar
      snackbarColor: "red",
      snackbarText: '',
      snackbar: false,

      // 申请部分
      applyFormValid: true,
      timeRules: [
        (v) => !!v || "这是必填项哦",
      ],
      contentRules: [
        (v) => !!v || "会议内容也是必填的哦",
        (v) => (v && v.length <= 100 && v.length > 4) || "会议内容限制在5-100字之间",
      ],
      appling: false,
      time1: null,
      time2: null,
      time3: null,
      menu1: false,
      menu2: false,
      menu3: false,
      applyDialog: false,
      // 教室列表获取
      roomList: '',
      roomNames: [],
      applyForm: {
        content: '',
        start: '',
        end: '',
        rid: ''
      },
      // 日历部分
      today: '2020-6-13 12:00:00',
      carding: false,
      focus: "",
      type: "month",
      typeToLabel: {
        month: "月",
        week: "周",
        day: "天",
        "4day": "四天",
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ]
    }
  },
  computed: {
    title () {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + "日";
      const endDay = end.day + "日";

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
  },
  mounted () {
    this.$refs.calendar.checkChange();
  },
  methods: {
    // 更新数据表
    updateEvent (obj) {
      const events = [];
      obj.forEach((element, index) => {
        events.push({
          name: element.content,
          start: this.formatDate(new Date(element.start)),
          end: this.formatDate(new Date(element.end)),
          color: this.colors[index % 7],
          details: element.content
        })
      });
      this.events = events
      this.carding = false
    },
    // 获取数据
    getRoomApply (s, e) {
      this.carding = true
      let that = this
      this.http
        .get("api/apply?time=" + s + "&rid=c51e456c-f6f4-4869-b688-bb72d64aaa52&end=" + e)
        .then((res) => {
          console.log(res);
          that.updateEvent(res.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击单日时
    viewDay ({ date }) {
      this.focus = date;
      this.type = "day";
    },
    // 时间颜色
    getEventColor (event) {
      return event.color;
    },
    // 单天焦点
    setToday () {
      this.focus = this.today;
    },
    // 前一页
    prev () {
      this.$refs.calendar.prev();
    },
    // 后一页
    next () {
      this.$refs.calendar.next();
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange ({ start, end }) {
      this.getRoomApply(new Date(start.date).toISOString(), new Date(end.date).toISOString())
      this.start = start;
      this.end = end;
      // 异步修改，此次只需要修改范围
      // this.events = events;
    },
    formatDate (a) {
      return `${a.getFullYear()}-${a.getMonth() +
        1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`;
    },
    // ============================ 课室申请部分 =======================
    validate (target) {
      return this.$refs[target].validate();
    },
    resetForm (target) {
      return this.$refs[target].reset();
    },
    // 取消申请框
    onApplyCancel () {
      this.applyDialog = false
      this.$refs.applyForm.resetValidation();
    },
    // 提交申请
    onApplyPost () {

      if (this.validate("applyForm")) {
        this.appling = true
        this.applyForm.start = new Date(this.time1 + " " + this.time2).toISOString()
        this.applyForm.end = new Date(this.time1 + " " + this.time3).toISOString()

        this.http.post("api/apply", this.applyForm)
          .then(res => {
            this.appling = false
            this.applyDialog = false
            console.log(res);
            this.resetForm('applyForm')

            if (res.data.data === 'time has been occupied') {
              this.snackbarColor = 'red'
              this.snackbarText = '申请失败, 该时间已被占用!'
            } else {
              // refresh view
              let newMonth = parseInt(new Date().getMonth()) + 1;
              let newYear = parseInt(new Date().getFullYear());
              let op = new Date(newYear, newMonth - 1, 1)
              let ed = new Date(newYear, newMonth, 0, 23, 59, 59)
              this.getRoomApply(op.toISOString(), ed.toISOString())
              this.snackbarColor = 'green'
              this.snackbarText = '申请成功'
            }
            this.snackbar = true
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 获取一个月第一天和最后一天
    getFirstAndLastDay () {
      let newMonth = parseInt(new Date().getMonth()) + 1;
      let newYear = parseInt(new Date().getFullYear());
      new Date(newYear, newMonth - 1, 1).getTime()
      new Date(newYear, newMonth, 0).getTime()
    },
    // 窗口开启
    applyRoom () {
      this.getRoom()
      this.applyDialog = true
    },
    // 教室获取
    getRoom () {
      let that = this
      this.http
        .get("api/apply/rooms")
        .then((res) => {
          that.roomList = res.data.data
          that.roomList.forEach(res => {
            this.roomNames.push(res.name)
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 教室列表更新
    onChangeList (val) {
      this.roomList.forEach(res => {
        if (res.name === val) {
          this.applyForm.rid = res.id
          return
        }
      })
    }
  },
};
</script>
