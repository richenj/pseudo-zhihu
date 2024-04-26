<template>
  <div class="list-item-actions">
    <div class="actions">
      <el-button
        v-if="showActionItems.indexOf('answer') >= 0"
        size="small"
        type="primary"
        plain
        icon="el-icon-edit"
        id="writeanswer"
      >写回答</el-button>

      <el-button
        v-if="showActionItems.indexOf('focus') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        icon="el-icon-plus"
      >关注问题</el-button>

      <el-button
        v-if="showActionItems.indexOf('later') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        icon="el-icon-timer"
      >稍后答</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showActionItems", "showType", "creatorId"],

  data() {
    return {};
  },

  methods: {
    fold() {
      // this.$parent.foldX();
      this.$emit("foldX");
    }
  }
};
</script>

<style>
#writeanswer {
  font-size: 0.7rem;
  border-color: #0084ff;
  background-color: white;
}

#writeanswer span{
  color: #0084ff;
}

#writeanswer:hover {
  background-color: #eff8ff;
}

.el-icon-edit {
  color: #0084ff;
}

.el-icon-plus, .el-icon-timer{
  color: rgb(133, 144, 166)
}
</style>