<template>
  <div></div>
</template>

<script>
import { checkid } from "@/libs/util";

export default {
  beforeMount() {
    checkid(this)
  },
};
</script>
