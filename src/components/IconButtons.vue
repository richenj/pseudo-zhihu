<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="6">
        <div class="icon-item normal-btn" v-if="exists.indexOf('question') >=0 ">
          <router-link to="/question-list">
            <span class="el-icon-tickets big-icon"></span>
            <p>回答问题</p>
          </router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="icon-item normal-btn" v-if="exists.indexOf('video') >=0 ">
          <span class="el-icon-video-camera big-icon"></span>
          <p>发视频</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="icon-item normal-btn" v-if="exists.indexOf('article') >=0 ">
          <router-link :to="{name: 'editor', params: {articleId: 0}}">
            <span class="el-icon-edit-outline big-icon"></span>
            <p>写文章</p>
          </router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="icon-item normal-btn" v-if="exists.indexOf('thinking') >=0 ">
          <span class="el-icon-news big-icon"></span>
          <p>写想法</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="icon-item normal-btn" v-if="exists.indexOf('live') >=0 ">
          <span class="el-icon-magic-stick big-icon"></span>
          <p>Live</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="icon-item normal-btn" v-if="exists.indexOf('book') >=0 ">
          <span class="el-icon-notebook-1 big-icon"></span>
          <p>书店</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="icon-item normal-btn" v-if="exists.indexOf('desk') >=0 ">
          <span class="el-icon-help big-icon"></span>
          <p>圆桌</p>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="icon-item normal-btn" v-if="exists.indexOf('expert') >=0 ">
          <span class="el-icon-edit big-icon"></span>
          <p>专栏</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="icon-item normal-btn" v-if="exists.indexOf('consult') >=0 ">
          <span class="el-icon-coin big-icon"></span>
          <p>付费咨询</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="icon-item normal-btn" v-if="exists.indexOf('wiki') >=0 ">
          <span class="el-icon-notebook-2 big-icon"></span>
          <p>百科</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["exists"]
};
</script>