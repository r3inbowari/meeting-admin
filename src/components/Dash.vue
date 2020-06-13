<template>
  <div>
    <v-row>
      <v-col cols="4">
        <Temp class="card-temp"></Temp>
        <Condition v-show="false"
                   class="card-condition"></Condition>
        <Apply></Apply>
      </v-col>
      <v-col cols="4">
        <Notice></Notice>
      </v-col>
      <v-col cols="4">
        <Timeline></Timeline>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Temp from "@/components/com/Temp";
import Condition from "@/components/com/Condition";
import Timeline from "@/components/com/Timeline";
import Notice from "@/components/com/Notice";

import Apply from "@/components/com/Apply";
export default {
  components: {
    Temp,
    Condition,
    Timeline,
    Notice,
    Apply
  },
  data () {
    return {};
  },
  mounted () {
    this.$root.infoLog("loaded account: " + this.$root.accountInfo.uid);
  }
};
</script>

<style scoped>
.card-temp {
}
.card-condition {
  top: 40px;
}
</style>
