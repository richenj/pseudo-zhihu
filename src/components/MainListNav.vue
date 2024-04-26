<template>
  <div class="main-list-nav">
    <el-card shadow="never" class="el-card-ex" id="list-nav-card">
      <el-menu class="listNav" :default-active="activeIndex" mode="horizontal">
        <el-menu-item index="1" v-if="type === 'main'">
          <router-link :to="{name: 'home'}">推荐</router-link>
          <!-- <router-link to="/">推荐</router-link> -->
        </el-menu-item>

        <el-menu-item index="2" v-if="type === 'main'">
          <!-- <router-link :to="{name: 'focus'}">关注</router-link> -->
          <router-link to="/">关注</router-link>
        </el-menu-item>

        <el-menu-item index="3" v-if="type === 'main'">
          <!-- <router-link :to="{name: 'hot'}">热榜</router-link> -->
          <router-link to="/">热榜</router-link>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      routerNametoIndex: {
        home: "1",
        focus: "2",
        hot: "3"
      },
      activeIndex: "1",
    };
  },
  mounted() {
    this.activeIndex = this.routerNametoIndex[this.$route.name];
  }
};
</script>

<style>
.main-list-nav #list-nav-card {
  padding: 0 10px;
}
</style>
