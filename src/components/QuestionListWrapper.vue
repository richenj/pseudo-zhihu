<template>
  <div class="question-list-wrapper">
    <!-- <div>test2</div> -->
    <div class="card-content">
      <router-view
        v-for="(item, index) in fakeInfoQ"
        :key="index"
        :item="item"
        :index="index"
        :type="item.type"
        :showPart="['title']"
        class="single-card"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  watch: {
    $route: "fetchDataQ"
  },

  mounted() {
    this.fetchDataQ();
  },

  methods: {
    fetchDataQ() {
      this.loading = true;
      if (this.$route.name === "home2") {
        this.getNormalListQ();
        this.loading = false;
      } else {
        console.log("fetchDataQ Error");
      }
    },

    async getNormalListQ() {
      console.log("getNormalListQ 开始");
      await this.$http.get("/questions/list").then(res => {
        console.log(res.data.list);
        if (res.data.status === 200) {
          this.fakeInfoQ = res.data.list;
        }
      });
    }
  },

  data() {
    return {
      type: "main",
      fakeInfoQ: "",
    };
  }
};
</script>

<style>
.question-list-wrapper .el-card {
  margin: -1px 0 0 0;
  font-size: 0.8rem;
  /* width: 694px; */
}

.el-card{
  padding: 20px;
}
</style>