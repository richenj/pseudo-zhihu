<template>
  <div class="list-item-actions">
    <div class="actions">
      <el-button
        v-if="showActionItems.indexOf('hot') >= 0"
        class="btn-text-gray"
        size="medium"
        type="text"
      >
        <span class="el"></span>
        <!-- {{metrics_area.text}} -->
      </el-button>

      <el-button
        v-if="showActionItems.indexOf('vote') >= 0"
        size="small"
        type="primary"
        plain
        icon="el-icon-caret-top"
        id="voteup"
      >赞同 {{voteup_count}}</el-button>

      <el-button
        v-if="showActionItems.indexOf('vote') >= 0"
        size="small"
        type="primary"
        plain
        icon="el-icon-caret-bottom"
        id="votedown"
      ></el-button>

      <el-button
        v-if="showActionItems.indexOf('comment') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        icon="el-icon-chat-round"
        @click="displayComments()"
      >
        <span v-if="!commentListShow">{{comment_count}} 条评论</span>
        <span v-if="commentListShow">收起评论</span>
      </el-button>

      <el-button
        v-if="showActionItems.indexOf('share') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        icon="el-icon-share"
      >分享</el-button>

      <el-button
        v-if="showActionItems.indexOf('favorite') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        icon="el-icon-star-off"
      >收藏</el-button>

      <el-button
        v-if="showActionItems.indexOf('like') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        icon="el-icon-medal"
      >喜欢</el-button>

      <el-dropdown
        v-if="showActionItems.indexOf('more') >= 0"
        placement="bottom"
        trigger="click"
        class="m-l-25"
      >
        <el-button class="btn-text-gray" size="medium" type="text" icon="el-icon-more"></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>没有帮助</el-dropdown-item>
          <el-dropdown-item>举报</el-dropdown-item>
          <el-dropdown-item>不感兴趣</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-button v-if="false" type="text">修改文章</el-button>
      <el-button v-if="false" type="text">删除文章</el-button>

      <div class="fold" v-if="showType === 'all'">
        <el-button class="btn-no-padding" type="text" @click="fold()" id="fold-icon">
          收起
          <i class="el-icon-arrow-up"></i>
        </el-button>
      </div>
    </div>

    <div shadow="never" class="comment" v-if="commentListShow">
      <comment-list :targetId="itemId" :targetType="type" />
      <!-- <hr class="hr m-b-15 m-t-15" color="#dcdfe6" size="1" /> -->
      <!-- <el-button
        class="block-center m-b-15"
        type="info"
        size="mini"
        plain
        @click="commentListShow = false"
      >收起评论</el-button>-->
    </div>

    <el-dialog
      class="no-title-dialog"
      title
      :visible.sync="commentDialogShow"
      :modal-append-to-body="false"
    >
      <comment-list :targetId="itemId" :targetType="type" />
    </el-dialog>
  </div>
</template>

<script>
import CommentList from "@/components/CommentList.vue";

export default {
  props: [
    "comment_count",
    "voteup_count",
    // "metrics_area",
    "showActionItems",
    "showType",
    "creatorId",
    "commentShowType",
    //新增comments用
    "itemId",
    "type",
  ],

  data() {
    return {
      commentListShow: false,
      commentDialogShow: false
    };
  },

  components: {
    CommentList
  },

  methods: {
    fold() {
      // this.$parent.foldX();
      this.$emit("foldX");
    },

    displayComments() {
      if (this.commentListShow === true) {
        this.commentListShow = false;
      } else if (this.commentShowType === "experct") {
        this.commentListShow = true;
      } else {
        this.commentDialogShow = true;
      }
    }
  }
};
</script>

<style>
.list-item-actions {
  position: relative;
  /* margin: 10px; */
}

.list-item-actions .el-button {
  padding-left: 15px;
}

/* .actions {
  float: left;
} */

.fold {
  float: right;
}

.comment {
  margin-top: 10px !important;
}

/* 不写span无法改变文本颜色,可以调整大小 */
#voteup {
  font-size: 0.7rem;
  /* padding: 7px 10px 7px 8px; */
  padding: 9px 10px 9px 10px;
  border-color: white;
}

#voteup span {
  color: #0084ff;
  margin-left: 2px;
}

#voteup:hover,
#votedown:hover {
  background-color: #daedfe;
}

/* 固定小三角颜色 */
.el-icon-caret-top,
.el-icon-caret-bottom {
  color: #0084ff;
}

#votedown {
  font-size: 0.7rem;
  padding: 9px 10px 9px 10px;
  border-color: white;
  margin-left: 2px;
}

.el-icon-chat-round,
.el-icon-share,
.el-icon-star-off,
.el-icon-medal,
.el-icon-more {
  color: gray;
}

#fold-icon {
  float: right;
  padding: 10px 0;
}

.no-title-dialog {
  width: 700px !important;
  margin: 0 auto !important;
}

.el-dialog {
  width: 668px !important;
}

.el-dialog__header,.el-dialog__body {
  padding: 0 !important;
}
</style>