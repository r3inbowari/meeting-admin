<template>
  <div>
    <v-card height="200px">
      <v-card-title class="blue white--text">
        <span class="headline">公告</span>

        <v-spacer></v-spacer>

        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>

      <v-card-text style="margin-top:10px"
        ><div>1. 什么事情</div>
        <div>2. 什么事情</div>
        <div>3. 什么事情</div>
        <div>4. 什么事情</div></v-card-text
      >
    </v-card>

		<v-card height="200px" style="margin-top:20px">
      <v-card-title class="blue white--text">
        <span class="headline">公告</span>

        <v-spacer></v-spacer>

        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>

      <v-card-text style="margin-top:10px"
        ><div>1. 什么事情</div>
        <div>2. 什么事情</div>
        <div>3. 什么事情</div>
        <div>4. 什么事情</div></v-card-text
      >
    </v-card>

		<v-card height="200px" style="margin-top:20px">
      <v-card-title class="blue white--text">
        <span class="headline">公告</span>

        <v-spacer></v-spacer>

        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>

      <v-card-text style="margin-top:10px"
        ><div>1. 什么事情</div>
        <div>2. 什么事情</div>
        <div>3. 什么事情</div>
        <div>4. 什么事情</div></v-card-text
      >
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "啊啊啊啊" },
    ],
  }),
};
</script>
