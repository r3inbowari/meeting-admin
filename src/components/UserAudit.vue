<template>
  <div>
    <v-card>
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat v-if="item.tab === items[0].tab">
            <v-text-field
              style="margin: 20px; right:10px; width:30%"
              v-model="search"
              append-icon="mdi-magnify"
              label="搜索"
              single-line
              hide-details
            ></v-text-field>
            <v-data-table
              loading
              style="height:100%"
              :headers="headers"
              :items="desserts"
              :items-per-page="10"
              class="elevation-1"
              :search="search"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn
                  style="margin-right:10px"
                  color="red"
                  @click="editItem(item)"
                  >拒绝</v-btn
                >
                <v-btn color="primary" @click="editItem(item)">同意</v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      tab: null,
      items: [
        { tab: "用户审核", content: "Tab 1 Content" },
        { tab: "用户管理", content: "施工中" },
      ],

      headers: [
        {
          text: "用户名",
          align: "start",
          sortable: false,
          value: "username",
        },
        { text: "用户ID", value: "uid" },
        { text: "操作", value: "actions", sortable: false, width: "40%" },
      ],
      desserts: [],
    };
  },
  methods: {
    editItem(item) {
      console.log(item);
      let index = this.desserts.indexOf(item);
      this.http
        .put("api/reg/" + item.uid, {})
        .then((res) => {
          console.log(res);
          this.desserts.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getApplyList() {
      this.http
        .get("api/reg")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getApplyList();
  },
};
</script>
