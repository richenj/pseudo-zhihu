<template>
  <div class="signup">
    <!-- <footer class="signup-footer">
      <div class="ZhihuLinks">
        <a target="blank" rel="noopener noreferrer" href="#">知乎专栏</a>
      </div>
    </footer>-->
    <sign-up-core />
  </div>
</template>

<script>
import SignUpCore from "@/components/SignUpCore.vue";

export default {
  components: {
    SignUpCore
  },

  //为不同页面设置body背景
  //组件内路由--进入组件时
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = "#b8e5f8";
    // window.document.body.style.backgroundImage = 'url("../assets/sign_bg.db29b0fb.png")';
    //Q:地址问题
    window.document.body.style.backgroundImage = 'url("/img/sign_bg.db29b0fb.db29b0fb.png")';
    console.log("beforeRouteEnter");
    next();
  },

  //组件内路由--离开组件时
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = "#f6f6f6";
    window.document.body.style.backgroundImage = "";
    console.log("beforeRouteLeave");
    next();
  },
};
</script>

<style>
body {
  /* height: 1350px;
  width: 1920px; */
  /* height: 100%;
  width: 100%; */
  /* background-color: #b8e5f8; */
  /* background-image: url("../assets/sign_bg.db29b0fb.png"); */
}
</style>