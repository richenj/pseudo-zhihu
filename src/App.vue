<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <MainHeader /> -->
    <!-- <Main /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import MainHeader from '@/components/MainHeader.vue';
// import Main from '@/Main.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // MainHeader,
    // Main,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  /* font-family: PingFang; */
}

/* 版心，浮动的公共类 */
.w {
  width: 1000px;
  /* width: 80%; */
  margin: 0 auto;
  /* position: relative; */
}

.ww {
  width: 700px;
  margin: 0 auto;
}

a {
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
  /* background-color: rgb(246, 246, 246); */
}

/* 清除自带style */
.el-menu.el-menu--horizontal {
  border-bottom: #fff;
}
</style>
