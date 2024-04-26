<template>
  <header class="editor-header">
    <div class="header-content w">
      <el-menu
        :default-active="activeIndex"
        class="m-r-20"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item>
          <router-link class="m-r-20" to="/">
            <!-- <img class="logo" src="../assets/logo.png" alt=""> -->
            <h1 style="color: #0084ff">知乎</h1>
          </router-link>
        </el-menu-item>

        <el-menu-item style="cursor: text">
          <span class="title" style="font-size: 0.8rem; font-weight: bold; color: black">写文章</span>
        </el-menu-item>

        <el-menu-item class="userInfo">
          <div class="functions">
            <!-- <el-dropdown class="publish m-r-25" placement="bottom"> -->
            <el-button
              plain
              size="small"
              style="font-size: 0.7rem; margin-right: 20px; padding: 5px 10px;"
              @click="$emit('releaseArticles')"
              class="release-btn"
              :class="{bottonblue: (title && content)}"
              :disabled="!(title && content)"
            >
              <span>发布</span>
              <i class="el-icon-arrow-down" style="margin: 0"></i>
            </el-button>
            <!-- <el-dropdown-menu></el-dropdown-menu> -->
            <!-- </el-dropdown> -->
            <el-dropdown class="more m-r-25" placement="bottom-end">
              <i class="el-icon-more-outline"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div>草稿</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div>我的文章</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div>专栏・发现</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script>
export default {
  props: ["title", "content"],

  data() {
    return {
      name: "",
      isLogin: false
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      await this.$http.get("/users/checkLogin").then(res => {
        if (res.status === 200) {
          this.name = res.data.name;
          this.isLogin = true;
        } else {
          this.$router.push({ name: "signup" });
          this.isLogin = false;
        }
      });
    }
  }
};
</script>

<style>
.editor-header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 #e8e8e8;
}

.bottonblue {
  border-color: #0084ff !important;
}

.bottonblue span,.bottonblue .el-icon-arrow-down {
  color: #0084ff !important;
}



</style>