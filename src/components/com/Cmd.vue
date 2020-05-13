<template>
  <div>
    <v-sheet class="" height="200px">
      <div style="top:3px; padding:20px 20px 0px 20px;position:absoluta">
        <v-icon>inbox</v-icon> <span style="top: 2px; position: relative;">运行日志</span> 

        <v-chip
          @click="onClick"
          color="#fff"
          style="position: absolute;right: 20px;"
          pill
          label
          ><v-icon>close</v-icon></v-chip
        >

        <v-chip
          @click="onBottom"
          color="#fff"
          style="position: absolute;right: 75px;"
          pill
          label
          ><v-icon>transit_enterexit</v-icon></v-chip
        >

        <v-chip
          @click="onDelLog"
          color="#fff"
          style="position: absolute;right: 130px;"
          pill
          label
          ><v-icon>delete_forever</v-icon></v-chip
        >
      </div>

      <div style="margin:0px 15px;">
        <v-list id="cmd" style="height: 170px; overflow-y: auto;" :dense="true">
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              style="max-height:1px"
              v-for="(item, i) in $root.cmd"
              :key="i"
            >
              <v-list-item-avatar style="width: 60px; min-width:60px">
                <v-chip
                  :color="item.color"
                  style="padding:8px;"
                  width="10"
                  label
                  x-small
                >
                  {{ item.type }}
                </v-chip>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.content"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: 5,
    };
  },
  methods: {
    onClick() {
      this.$emit("onClose");
    },
    exampleFunc() {
      this.$root.infoLog("🌠 Ready on http://r3inbowari:8080");
    },
    onBottom() {
      this.$nextTick(() => {
        var container = this.$el.querySelector("#cmd");
        container.scrollTop = container.scrollHeight;
      });
    },
    onDelLog() {
      this.$root.cmd = [];
    },
  },
  mounted() {
    this.$nextTick(() => {
      var container = this.$el.querySelector("#cmd");
      container.scrollTop = container.scrollHeight;
    });
  },
};
</script>
