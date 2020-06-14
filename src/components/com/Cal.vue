<template>
  <div style="height:100%">
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
                今天
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
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>日</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>周</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>月</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4天</v-list-item-title>
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
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text
                         color="secondary"
                         @click="selectedOpen = false">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      today: '2020-6-13 12:00:00',
      carding: true,
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

      obj.forEach(element => {
        events.push({
          name: element.content,
          start: this.formatDate(new Date(element.start)),
          end: this.formatDate(new Date(element.end)),
          color: 'orange',
        })
      });
      this.events = events
    },
    // 获取数据
    getRoomApply (s, e) {
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
      console.log('233');

      this.focus = date;
      this.type = "day";
    },
    // 时间颜色
    getEventColor (event) {
      return event.color;
    },
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
      let a = new Date(start.date).toISOString()
      let b = new Date(end.date).toISOString()

      this.getRoomApply(a, b)
      this.start = start;
      this.end = end;
      // 异步修改
      // this.events = events;
    },
    formatDate (a) {
      return `${a.getFullYear()}-${a.getMonth() +
        1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`;
    },
  },
};
</script>
