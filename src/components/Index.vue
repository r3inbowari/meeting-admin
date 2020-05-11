<template>
  <div></div>
</template>

<script>
import { getToken } from "@/libs/util";

export default {
  beforeCreate() {
    if (!getToken()) {
      this.$router.push({
        name: "Login",
      });
    } else {
      this.$router.push({
        name: "Home",
      });
    }
  },
};
</script>
