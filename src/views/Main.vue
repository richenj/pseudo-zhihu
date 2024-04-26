<template>
  <div class="mainplain">
    <MainHeader />
    <div class="w">
      <el-row>
        <el-col :span="17">
          <div class="main-content">
            <div class="list grid-content">
              <main-list-wrapper />
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="sidebar grid-content">
            <main-sidebar />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainListWrapper from "@/components/MainListWrapper.vue";
import MainSidebar from "@/components/MainSidebar.vue";

export default {
  name: "main",
  components: {
    MainHeader,
    MainListWrapper,
    MainSidebar
  }
};
</script>

<style>
/* .mainplain {
  background-color: rgb(246, 246, 246)
} */

body {
  background-color: rgb(246, 246, 246);
}

.main-list-wrapper .el-card {
  padding: 20px;
}

.el-row {
  margin-top: 10px;
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-card-ex {
  box-shadow: 0 1px 2px 0 #ddd,
              0 -1px 2px 0 #f5f5f5,
              1px 0 2px 0 #f5f5f5,
              -1px 0 2px 0 #f5f5f5;
  border: 0 #EBEEF5 !important;
  border-radius: 2px !important;
}

.el-card-comment {
  border: 0 #EBEEF5 !important;
  border-radius: 0px !important;
}
</style>