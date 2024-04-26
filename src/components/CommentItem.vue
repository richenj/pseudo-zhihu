<template>
  <el-card class="el-card-comment">
    <div class="comment-item" @mouseenter="mouseenter" @mouseleave="mouseleave" >
      <div class="header clearfix">
        <div class="user-info">
          <span class="avatar">
            <img :src="item.author.avatarUrl" alt />
          </span>
          <span class="username" style="color: black;">{{item.author.name}}</span>
          <span class="created-time">{{item.createdAt | dateFilter}}</span>
        </div>
      </div>
      <span class="content" style="color: black;">{{item.content}}</span>
      <div>
        <comment-item-actions
          :item="item"
          v-bind="$attrs"
          v-on="$listeners"
          :commenthover="commenthover"
        />
      </div>
    </div>
    <!-- <hr class="hr m-b-15" color=#dcdfe6 size=1 /> -->
  </el-card>
</template>

<script>
import moment from "moment";
import CommentItemActions from "@/components/CommentItemActions.vue";

export default {
  props: ["item"],

  data() {
    return {
      comment: "",
      commenthover: false,
    };
  },

  components: {
    CommentItemActions
  },

  filters: {
    dateFilter: date => {
      moment.locale("zh-cn");
      return moment(date).format("MM-DD HH:mm");
    }
  },

  methods: {
    mouseenter() {
      this.commenthover = true;
      // console.log("mouseenter");
    },
    mouseleave() {
      this.commenthover = false;
      // console.log("mouseleave");
    },
  }
};
</script>

<style>
.el-card.el-card-comment {
  padding-bottom: 5px !important;
}

.user-info {
  padding-bottom: 10px;
}

.created-time {
  float: right;
}
</style>