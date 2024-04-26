<template>
  <div>
    <div class="comment-actions">
      <el-button class="btn-text-gray" size="medium" type="text" style="padding-left: 0">
        <span class="el el-icon-thumb"></span>
        <!-- {{JSON.parse(activeStatus.voteUp).length}} -->
        赞
      </el-button>

      <el-button
        class="btn-text-gray hover-hidden"
        size="medium"
        type="text"
        @click="replyShow = true"
        v-show="!replyShow"
        v-if="!deleteShow"
      >
        <!-- <span class="el el-icon-position"></span>
        回复-->
        <transition name="fade">
          <p v-if="commenthover">
            <span class="el el-icon-position"></span>
            回复
          </p>
        </transition>
      </el-button>

      <el-button
        class="btn-text-gray"
        size="medium"
        type="text"
        @click="replyShow = false"
        v-show="replyShow"
        v-if="!deleteShow"
      >
        <span class="el el-icon-position"></span>
        取消回复
      </el-button>

      <el-button
        class="btn-text-gray hover-hidden"
        size="medium"
        type="text"
        v-show="deleteShow"
        @click="deleteComment()"
      >
        <i class="el-icon-delete">删除</i>
      </el-button>

      <el-button
        class="btn-text-gray hover-hidden"
        size="medium"
        type="text"
        v-show="item.comment.length !== 0"
        @click="commentListShow = true"
      >
        <span class="el"></span>
        查看回复
      </el-button>

      <el-button class="btn-text-gray hover-hidden" size="medium" type="text">
        <!-- {{JSON.parse(activeStatus.voteDown).length}} -->
        <transition name="fade">
          <p v-if="commenthover">
            <span class="el el-icon-sort-down"></span>
            踩
          </p>
        </transition>
      </el-button>

      <el-button class="btn-text-gray hover-hidden" size="medium" type="text">
        <transition name="fade">
          <p v-if="commenthover">
            <span class="el el-icon-chat-square"></span>
            举报
          </p>
        </transition>
      </el-button>

      <el-card class="comment" v-if="commentListShow">
        <comment-list :targetId="item.id" :targetType="item.type" />
        <el-button
          class="block-center m-b-15"
          type="info"
          size="mini"
          plain
          @click="commentListShow = false"
        >收起评论</el-button>
      </el-card>
    </div>

    <div class="reply" v-show="replyShow">
      <el-input class="comment-input-reply" type="text" v-model="replyContent" placeholder="回复..." />
      <el-button
        class="m-l-25"
        id="comment-btn"
        type="primary"
        @click="createComment()"
        :class="{bottondarken: replyContent}"
        :disabled="!replyContent"
      >发布</el-button>
    </div>
  </div>
</template>

<script>
import { getCookies } from "../lib/utils";

export default {
  props: ["item", "commenthover"],

  data() {
    return {
      replyShow: false,
      replyContent: "",
      commentListShow: false
    };
  },

  computed: {
    deleteShow() {
      return this.item.author
        ? this.item.author.id === parseFloat(getCookies("id"))
        : false;
    }
  },

  methods: {
    async createComment() {
      //二者为空
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

    //MY
    //父组件的this和孙子组件的this不同...
    // createCommentGrandson() {
    //   this.$emit("createCommentSon");
    // },

    async deleteComment() {
      await this.$http
        .delete("/comments", {
          data: {
            id: this.item.id,
            creatorId: getCookies("id")
          }
        })
        .then(res => {
          if (res.data.status === 202) {
            this.$Message.success("删除成功");
            this.$emit("getComments");
          }
        });
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.comment-input-reply {
  padding: 10px 20px 10px 0;
  width: 550px !important;
}
</style>