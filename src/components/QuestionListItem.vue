<template>
  <el-card>
    <div class="answer-main">
      <div class="title" v-if="showPart.indexOf('title') >= 0">
        <!-- 问题标题 -->
        <!-- 请求数据用 -->
        <h3>
          <router-link
            :to="{name: 'detailsQuestion',
              params: {
                id: item.id
              }}"
            class="item-title"
          >
          {{item.title}}
          </router-link>
        </h3>
      </div>

      <!-- 请求数据用 -->
      <div class="class-main">
        <question-list-item-actions
          v-bind="$attrs"
          v-on="$listeners"
          :type="type"
          :itemId="item.id"
          :relationship="33"
          :showActionItems="showActionItems"
          :showType="showType"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
import QuestionListItemActions from "@/components/QuestionListItemActions.vue";

export default {
  props: ["item", "showPart", "type"],

  components: {
    QuestionListItemActions
  },

  data() {
    return {
      showType: "experct",
      showActionItems: ["answer", "focus", "later"]
    };
  },
};
</script>

<style>
</style>