<template>
  <div class="main-sidebar">
    <el-card shadow="never" class="no-padding m-b-15 el-card-ex" id="sidebar1">
      <icon-buttons :exists="['question', 'video', 'article', 'thinking']" />
      <div>
        <el-row>
          <el-col :span="12">
            <div class="draft nav-link">
              <a href="#">
                <span class="text">
                  <span class="el middle-icon">稍后答</span>
                  <span class="num">1</span>
                </span>
              </a>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="draft nav-link">
              <a href="#">
                <span class="text">
                  <span class="el middle-icon">草稿箱</span>
                  <span class="num">2</span>
                </span>
              </a>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card shadow="never" class="no-padding m-b-15 el-card-ex" id="sidebar2">
      <icon-buttons :exists="['live', 'book', 'desk', 'expert', 'consult', 'wiki']" style="font-size: 0.8rem"/>
    </el-card>

    <el-card shadow="never" class="no-padding m-b-15 el-card-ex" id="sidebar3">
      <div class="nav-link">
        <a href>
          <span class="text">
            <i class="el-icon-star-off middle-icon"></i>
            我的收藏
          </span>
        </a>
      </div>
      <div class="nav-link">
        <a href>
          <span class="text">
            <i class="el-icon-view middle-icon"></i>
            我关注的问题
          </span>
        </a>
      </div>
      <div class="nav-link">
        <a href>
          <span class="text">
            <i class="el-icon-thumb middle-icon"></i>
            我的邀请
          </span>
        </a>
      </div>
      <div class="nav-link">
        <a href>
          <span class="text">
            <i class="el-icon-money middle-icon"></i>
            我的余额
          </span>
        </a>
      </div>
      <div class="nav-link">
        <a href>
          <span class="text">
            <i class="el-icon-chat-line-square middle-icon"></i>
            站务中心
          </span>
        </a>
      </div>
      <div class="nav-link">
        <a href>
          <span class="text">
            <i class="el-icon-service middle-icon"></i>
            帮助中心
          </span>
        </a>
      </div>
      <div class="nav-link">
        <a href>
          <span class="text">
            <i class="el-icon-reading middle-icon"></i>
            版权服务中心
          </span>
        </a>
      </div>
    </el-card>
    <sidebar-footer />
  </div>
</template>

<script>
import IconButtons from "@/components/IconButtons.vue";
import SidebarFooter from "@/components/SidebarFooter.vue";

export default {
  components: {
    IconButtons,
    SidebarFooter,
  },
  data() {
    return {};
  }
};
</script>

<style>
.main-sidebar .el-card {
  box-sizing: border-box;
  /* 已被span所自动设定 */
  /* width: 300px; */
  margin: 0 0 10px 10px;
  padding: 10px;
  text-align: center;
  font-size: 0.7rem;
}

#sidebar1 {
  padding-bottom: 0;
}

#sidebar1 .icon-buttons {
  height: 0;
}

#sidebar1 .nav-link{
  text-align: center;
}

#sidebar2 {
  padding: 0 10px;
}

.main-sidebar div,span,a {
  color: rgb(133, 144, 166);
}

.main-sidebar i {
  padding: 0 10px 10px 0;
}

.main-sidebar span {
  padding-bottom: 10px;
}

.el-card__body {
  /* margin: 0 !important; */
  padding: 0 !important;
}

.nav-link {
  height: 40px;
  line-height: 40px;
  /* float: left; */
  text-align: left;
  margin: 0 20px;
}
</style>