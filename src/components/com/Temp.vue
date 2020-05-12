<template>
  <v-card class="" color="grey lighten-4" max-width="600">
    <v-card-title>
      <v-icon
        :color="checking ? 'red lighten-2' : 'indigo'"
        class="mr-12"
        size="64"
        @click="takePulse"
      >
        ac_unit
      </v-icon>
      <v-row align="start">
        <div class="caption grey--text text-uppercase">
          室内温度
        </div>
        <div>
          <span class="display-2 font-weight-black" v-text="avg || '—'"></span>
          <strong v-if="avg">°C</strong>
        </div>
      </v-row>

      <v-spacer></v-spacer>

      <div>
        当前时间: 2020/05/12
        <v-btn icon class="align-self-start alb" size="28">
          <v-icon>mdi-arrow-right-thick</v-icon>
        </v-btn>
      </div>
    </v-card-title>

    <v-sheet color="transparent">
      <v-sparkline
        :key="String(avg)"
        :smooth="16"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="3"
        :value="heartbeats"
        auto-draw
        stroke-linecap="round"
      ></v-sparkline>
    </v-sheet>
  </v-card>
</template>

<script>
const exhale = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  data: () => ({
    checking: false,
    heartbeats: [],
  }),

  computed: {
    avg() {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0);
      const length = this.heartbeats.length;

      if (!sum && !length) return 0;

      return Math.ceil(sum / length);
    },
  },

  created() {
    this.takePulse(false);
  },

  methods: {
    heartbeat() {
      return Math.ceil(Math.random() * (120 - 110) + 20);
    },
    async takePulse(inhale = true) {
      this.checking = true;

      inhale && (await exhale(1000));

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat);

      this.checking = false;
    },
  },
};
</script>

<style scoped>
.alb {
  top: 0px;
}
</style>
