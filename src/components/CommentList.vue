<template>
  <div>
    <el-card class="comment-list p-t-20 el-card-comment">
      <p class="comment-num" v-show="commentList.length === 0">还没有评论</p>
      <p class="comment-num" v-show="commentList.length !== 0">{{commentList.length}} 条评论</p>
    </el-card>
    <div class="el-card-comment" v-loading="loading" v-show="commentList.length !== 0">
      <comment-item
        v-for="(comment, index) in commentList"
        :key="index"
        :item="comment"
        @getComments="getComments"
      />
    </div>

    <el-card class="comment-list p-t-20 el-card-comment">
      <div class="comment-part clearfix">
        <el-input class="comment-input" v-model="comment" placeholder="写下你的评论..." />
        <el-button
          id="comment-btn"
          type="primary"
          @click="createComment()"
          :class="{bottondarken: comment}"
          :disabled="!comment"
        >发布</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCookies } from "../lib/utils";
import CommentItem from "@/components/CommentItem.vue";

export default {
  props: ["targetId", "targetType"],

  data() {
    return {
      loading: true,
      comment: "",
      commentList: []
    };
  },

  components: {
    CommentItem
  },

  mounted() {
    this.getComments();
  },

  methods: {
    async createComment() {
      console.log("targetId:");
      console.log(this.targetId);
      console.log("targetType:");
      console.log(this.targetType);
      await this.$http
        .post("/comments", {
          targetId: this.targetId,
          targetType: this.targetType,
          content: this.comment,
          creatorId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$Message.success("评论成功");
          }
        })
        .then(this.getComments);
    },

    async getComments() {
      this.loading = true;
      await this.$http
        .get("/comments", {
          params: {
            targetId: this.targetId,
            targetType: this.targetType
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.commentList = res.data.list;
            this.loading = false;
          } else {
            this.$Message.error(res.error);
          }
        });
    }
  }
};
</script>

<style>
.comment-list {
  padding: 0 !important;
  margin: 0;
}

.comment-num {
  padding: 20px;
  font-weight: bold;
}

.comment-input {
  padding: 10px 20px;
  width: 550px !important;
}

/* 无效 */
.comment-input:active {
  border-color: pink !important;
}

#comment-btn {
  /* font-size: 0.7rem; */
  /* padding: 9px, 15px !important; */
  /* padding: 9px 10px 9px 10px; */
  padding: 12px 14px;
  background-color: #80c2ff;
  border-color: white;
}

#comment-btn span {
  color: #fff;
}

.bottondarken {
  background-color: #0084ff !important;
}
</style>