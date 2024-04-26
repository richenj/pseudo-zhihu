<template>
  <div class="main">
    <MainHeader />
    <div class="w">
      <el-row>
        <el-col :span="17">
          <div class="main-content">
            <div class="list grid-content">
              <!-- <div>test1</div> -->
              <question-list-wrapper />
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
import QuestionListWrapper from "@/components/QuestionListWrapper.vue";
import MainSidebar from "@/components/MainSidebar.vue";

export default {
  name: "main",
  components: {
    MainHeader,
    QuestionListWrapper,
    MainSidebar
  }
};
</script>

<style>
.main {
  background-color: rgb(246, 246, 246)
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
</style>