<template>
  <header class="main-header">
    <div class="header-content w" id="header-content">
      <!-- style="height: 52px" -->
      <el-menu
        :default-active="activeIndex"
        class="m-r-20"
        mode="horizontal"
        @select="handleSelect"
      >
        <!-- <el-menu-item style="padding: 0">
          <span style="color: #0084ff">Pseudo</span>
        </el-menu-item>-->
        <el-menu-item style="padding-left: 0">
          <router-link class="m-r-20" to="/">
            <!-- <img class="logo" src="../assets/logo.png" alt=""> -->
            <h1 style="color: #0084ff">知乎</h1>
          </router-link>
        </el-menu-item>

        <el-menu-item index="1">
          <router-link to="/">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/">发现</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/question-list">等你来答</router-link>
        </el-menu-item>

        <el-menu-item class="search">
          <el-input size="medium" class="search m-r-10" placeholder v-model="keywords">
            <el-button slot="append" icon="el-icon-search" style="padding: 5px"></el-button>
          </el-input>
        </el-menu-item>

        <el-menu-item class="search">
          <el-button type="primary" size="small" id="ask" @click="askModelVisiable = true">
            提问
            <!-- <router-link :to="{name: 'editor', params: {articleId: 0}}">提问</router-link> -->
          </el-button>
        </el-menu-item>

        <el-menu-item class="userInfo">
          <div v-if="!isLogin">
            <router-link :to="{ name: 'signup' }">登录</router-link>
          </div>
        </el-menu-item>

        <el-menu-item class="userInfo">
          <div v-if="isLogin">
            <i class="el-icon-bell m-r-40 icon-item" style="padding-right: 30px"></i>
            <i class="el-icon-chat-round m-r-40 icon-item" style="padding-right: 30px"></i>
            <el-dropdown placement="bottom" trigger="click" class="hand-click">
              <span style="color: #aaa">
                <!-- <img class="avatar" src="../assets/logo.jpg" alt style="height: 30px" /> -->
                {{this.name}}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="goToPersonalPage">
                    <span class="el el-icon-user-solid"></span>
                    我的主页
                  </div>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <div @click="logout">
                    <span class="el el-icon-s-custom"></span>
                    创作者中心
                  </div>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <div @click="logout">
                    <span class="el el-icon-setting"></span>
                    设置
                  </div>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <div @click="logout">
                    <span class="el el-icon-s-release"></span>
                    退出
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-menu-item>
      </el-menu>
    </div>

    <el-dialog title :visible.sync="askModelVisiable" :model-append-to-body="false">
      <ask-model @changeAskModelVisiable="changeAskModelVisiable()" />
    </el-dialog>
  </header>
</template>

<script>
import AskModel from "./AskModel.vue";

export default {
  data() {
    return {
      activeIndex: "1",
      keywords: "",
      isLogin: false, //true or false
      name: "",
      askModelVisiable: false
    };
  },

  components: {
    AskModel
  },

  mounted() {
    this.checkLogin();
  },

  // updated() {
  //   this.checkLogin();
  // },

  methods: {
    handleSelect(key) {
      console.log(key);
    },
    goToPersonalPage() {
      console.log("跳转到用户首页");
    },

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
    },

    async logout() {
      await this.$http.post("/users/logout").then(res => {
        if (res.status === 200) {
          this.$Message.success("注销成功");
          this.name = "";
          this.$router.push({ name: "signup" });
        } else {
          this.$Message.error("注销失败，请稍后再试");
        }
      });
    },

    changeAskModelVisiable(status) {
      this.askModelVisiable = status;
      // console.log("changeAskModelVisiable");
    }
  }
};
</script>

<style>
.main-header {
  /* el-menu的高度无法直接调整 */
  /* height: 52px; */
  background-color: #fff;
  /* border-bottom: solid 1px #ccc; */
  /* 向右距离、向下距离、模糊半径、阴影半径 */
  box-shadow: 0 2px 2px 0 #e8e8e8;
  /* ToDo: 固定header */
  /* position: fixed; */
}

.main-header span {
  color: #fff;
}

/* 去除el-menu底下的灰线 */
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 0.8rem;
}

.el-menu--horizontal > .el-menu-item.search {
  padding-right: 0;
}

.el-menu--horizontal > .el-menu-item.userInfo {
  float: right;
  padding: 0;
}

.main-header .el-input__inner {
  background-color: rgb(246, 246, 246);
  width: 250px;
}

/* button.el-button.el-button--default {
  padding: 0px;
} */

#ask {
  font-size: 0.7rem;
  background-color: #0084ff;
}

#ask:hover {
  background-color: #0077e7;
}

.el-dialog {
  margin-top: 35vh !important;
  width: 540px !important;
}
</style>