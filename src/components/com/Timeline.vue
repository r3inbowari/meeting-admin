<template>
  <v-timeline>
    <v-timeline-item v-for="n in 4" :key="n" color="blue lighten-2" large>
      <template v-slot:opposite>
        <span>五月12日</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="headline">课室是多少</v-card-title>
        <v-card-text>
          我也不知道我也不知道
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
