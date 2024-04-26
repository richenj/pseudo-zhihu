<template>
  <div>
    <!-- 有X关闭按钮 -->
    <!-- <el-card>
      test
    </el-card> -->
    <el-card class="ask-model">
      <el-input
        class="question-title"
        type="text"
        v-model="title"
        placeholder="写下你的问题,准确地描述问题更容易得到解答"
      />
      <rich-text-editor
        class="with-border m-t-10"
        ref="richtext"
        :content="discription"
        :placeHolder="placeHolder"
        @updateContent="updateContent"
      />
      <div class="footer m-t-10">
        <!-- <el-button @click="$emit('changeAskModelVisiable', false)">
        <span style="color: black">取消</span>
        </el-button>-->
        <el-button type="primary" @click="releaseQuestion" :disabled="!title">发布问题</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import RichTextEditor from "./RichTextEditor.vue";
import { getCookies } from "../lib/utils";
import _ from "lodash";

export default {
  props: ["oldItem"],

  components: {
    RichTextEditor
  },

  data() {
    return {
      title: "",
      discription: "",
      excerpt: "",
      placeHolder: "输入问题背景、条件等详细信息(选填)"
    };
  },

  mounted() {
    if (!_.isEmpty(this.oldItem)) {
      this.title = this.oldItem.title;
      this.discription = this.oldItem.discription;
      this.$refs.richtext.updateContent(this.discription);
    }
  },

  methods: {
    updateContent(content, contentText) {
      this.discription = content;
      this.excerpt =
        contentText.length > 100 ? contentText.slice(0, 100) : contentText;
    },

    releaseQuestion() {
      if (!_.isEmpty(this.oldItem)) {
        this.updateQuestion();
      } else {
        this.createQuestion();
      }
    },

    async createQuestion() {
      await this.$http
        .post("/questions", {
          title: this.title,
          excerpt: this.excerpt,
          discription: this.discription,
          userId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$Message.success("问题创建成功");
            this.$emit("changeAskModelVisiable", false);
          } else {
            this.$Message.error("问题创建失败，请稍后再试");
          }
        });
    },

    async updateQuestion() {
      await this.$http
        .put("/questions", {
          questionId: this.oldItem.id,
          title: this.title,
          excerpt: this.excerpt,
          discription: this.discription,
          userId: getCookies("id")
        })
        .then(res => {
          if (res.data.status === 202) {
            this.$Message.success("问题修改成功");
            this.$emit("changeAskModelVisiable", false);
            this.$emit("updateQuestion");
          } else {
            this.$Message.error("问题修改失败，请稍后再试");
          }
        });
    }
  }
};
</script>

<style>
/* 从div换成el-card之后就不需要了 */
/* .ask-model {
  padding: 20px 20px 60px 20px;
} */

.ask-model .el-input__inner {
  width: 600px !important;
  background-color: #fff !important;
  border-color: #fff !important;
  font-size: 0.9rem;
  padding-left: 0;
}

.question-title {
  width: 600px !important;
}

.rich-text-editor {
  width: 628px !important;
}

.el-dialog__body {
  padding: 10px 20px 30px 20px !important;
}

.footer .el-button {
  float: right;
}
</style>