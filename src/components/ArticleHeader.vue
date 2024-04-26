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
          <span class="title" style="font-size: 0.8rem; font-weight: bold; color: black">{{name}}</span>
        </el-menu-item>

        <el-menu-item class="userInfo">
          <div class="functions">
            <!-- <el-dropdown class="publish m-r-25" placement="bottom"> -->
            <el-button plain size="small" id="new-article-btn">
              <router-link :to="{name: 'editor', params: {articleId: 0}}" id="new-article">
                <span class="el-icon-edit-outline big-icon" style="margin: 0"></span>
                写文章
              </router-link>
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
  props: ["name"],

  data() {
    return {};
  }
};
</script>

<style>
#new-article-btn {
  font-size: 0.7rem;
  margin-right: 20px;
  border-color: #0084ff;
  padding: 5px 10px;
}

#new-article-btn:hover {
  background-color: #eff8ff;
}

#new-article {
  color: #0084ff;
  border-color: #0084ff;
  margin-left: -5px;
}

#new-article span {
  color: #0084ff;
}
</style>