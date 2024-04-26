<template>
  <div class="question-header">
    <MainHeader />
    <div class="question-details w" v-loading="loading">
      <div class="question-header">
        <el-dialog title="修改问题" :visible.sync="askModelVisiable" :modal-append-to-body="false">
          <ask-model
            @changeAskModelVisiable="changeAskModelVisiable"
            @updateQuestion="getQuestion"
            :oldItem="questionData"
          />
        </el-dialog>

        <div class="question-header-content">
          <div class="question-header-main">
            <h3 class="question-header-title">
              {{questionData.title}}
              <el-button type="text" class="m-l-25 gray" @click="askModelVisiable=true">
                <i class="el-icon-edit el-icon--left"></i>
                编辑
              </el-button>
            </h3>
            <div
              class="question-header-details"
              v-show="showType === 'experct'"
              v-if="questionData.excerpt"
            >
              <span style="color: black">{{questionData.excerpt}}</span>
              <el-button
                class="btn-no-padding m-l-10"
                type="text"
                icon="el-icon-arrow-down"
                @click="showType='all'"
              >阅读全文</el-button>
            </div>
            <div
              class="question-header-details"
              v-show="showType === 'all'"
              v-if="questionData.excerpt"
            >
              <div v-html="questionData.discription"></div>
              <el-button
                class="btn-no-padding"
                type="text"
                icon="el-icon-arrow-up"
                @click="showType='experct'"
              >收起</el-button>
            </div>
          </div>
        </div>

        <div class="question-header-footer">
          <div class="question-header-footer-inner">
            <div class="question-header-footer-main">
              <div class="question-header-btnGroup">
                <el-button
                  size="small"
                  type="primary"
                  id="focusanswer"
                >关注问题</el-button>
                <el-button
                  size="small"
                  type="primary"
                  plain
                  icon="el-icon-edit"
                  @click="showAnswerPart()"
                  :disabled="!currentAnswerEmpty"
                  id="writeanswer"
                >写回答</el-button>
                <!-- </div> -->
                <!-- <div class="question-header-actions"> -->
                <el-button
                  size="small"
                  class="button"
                  type="info" plain
                  icon="el-icon-user"
                  id="inviteanswer"
                >
                  <span class="el"></span>
                  邀请回答
                </el-button>
                <!-- <list-item-actions
                  class="actions"
                  :itemId="questionData.id"
                  :type="1"
                  :showActionItems="['comment', 'share', 'more']"
                />-->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="question-main">
        <el-col :span="17">
          <!-- 编辑回答 -->
          <el-card class="answer-card m-b-15" v-loading="authorLoading" v-show="answerVisiable">
            <div class="author-info m-t-25">
              <div class="avatar">
                <img src="authorInfo.avatarUrl || ''" alt />
              </div>
              <div class="userinfo">
                <p class="username">{{authorInfo.name}}</p>
                <p class="headline">{{authorInfo.headline}}</p>
              </div>
              <rich-text-editor
                class="with-border m-t-15 m-b-15"
                ref="richtext"
                :content="answerContent"
                :placeHolder="placeHolder"
                @updateContent="updateContent"
              />
              <div class="m-b-25">
                <el-button
                  type="default"
                  size="small"
                  @click="answerVisiable = false"
                  id="cancelanswer"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="createAnswer"
                  id="submitanswer"
                  :disabled="!answerContent"
                >提交回答</el-button>
              </div>
            </div>
          </el-card>

          <!-- 回答展示 -->
          <!-- <div>回答展示</div> -->
          <!-- <div v-show="1" class="m-b-25"> -->
          <div v-show="!currentAnswerEmpty" class="m-b-25">
            <list-item
              class="without-border no-padding"
              :item="currentAnswer"
              :showPart="['creator', 'experct']"
              :type="2"
            />
            <!-- :showPart="['creator', 'votes']" -->
          </div>
          <el-card v-show="allAnswerLength === 0">
            <div class="no-answer m-t-25 m-b-25">暂时还没有回答，开始写第一个回答</div>
          </el-card>
          <div v-show="questionData.answer ? questionData.answer.length > 0 : false">
            <div class="list">
              <!-- <div class="list-header">
                <span>{{questionData.answer ? questionData.answer.length : 0}}个回答</span>
              </div> -->
              <div class="list-item" v-for="(answer, index) in questionData.answer" :key="index">
                <list-item
                  :item="answer"
                  :index="index"
                  :showPart="['creator', 'experct']"
                  :type="2"
                />
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="7">
          <div class="question-main-sidebar">
            <sidebar-footer />
          </div>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
const _ = require("lodash");
import MainHeader from "@/components/MainHeader.vue";
import ListItem from "@/components/ListItem.vue";
// import ListItemActions from "@/components/ListItemActions.vue";
import SidebarFooter from "@/components/SidebarFooter.vue";
import AskModel from "@/components/AskModel.vue";
import RichTextEditor from "@/components/RichTextEditor.vue";
import { getCookies } from "../lib/utils";

export default {
  components: {
    MainHeader,
    ListItem,
    // ListItemActions,
    SidebarFooter,
    AskModel,
    RichTextEditor
  },
  data() {
    return {
      questionData: {},
      loading: true,
      authorLoading: false,
      answerVisiable: false,
      commentShowType: "all",
      showType: "experct",
      askModelVisiable: false,
      answerContent: "",
      answerExperct: "",
      placeHolder: "写回答",
      authorInfo: {},
      currentAnswer: {}
    };
  },

  mounted() {
    this.getQuestion();
  },

  computed: {
    currentAnswerEmpty() {
      return _.isEmpty(this.currentAnswer);
    },
    allAnswerLength() {
      const questionDataAnswerLength = this.questionData.answer
        ? this.questionData.answer.length
        : 0;
      return this.currentAnswerEmpty
        ? questionDataAnswerLength
        : questionDataAnswerLength + 1;
    }
  },

  methods: {
    async getQuestion() {
      console.log("开始getQuestion");
      this.loading = true;
      await this.$http
        .get("/questions", {
          params: {
            questionId: this.$route.params.id
          }
        })
        .then(res => {
          console.log("params.id:");
          console.log(this.$route.params.id);
          this.questionData = res.data.content;
          console.log("questionData:");
          console.log(this.questionData);
          console.log(this.questionData.answer);
          this.questionData.answer = _.compact(
            _.map(this.questionData.answer, item => {
              if (item.creatorId === parseFloat(getCookies("id"))) {
                this.currentAnswer = item;
                console.log("currentAnswer:");
                console.log(this.currentAnswer);
                return null;
              }
              return item;
            })
          );
          this.loading = false;
        });
    },

    async getAuthorInfo() {
      this.authorLoading = true;
      await this.$http
        .get("/users", {
          params:{
            userId: getCookies("id")
            // userId: 0
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.authorInfo = res.data.content;
            this.authorLoading = false;
          }
        });
    },

    async createAnswer() {
      this.authorLoading = true;
      console.log("createAnswer开始");
      console.log(this.answerContent)
      await this.$http
        .post("/answers", {
          // params:{
            creatorId: getCookies("id"),
            content: this.answerContent,
            excerpt: this.answerExperct,
            targetId: this.questionData.id
          // }
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$Message.success("回答成功");
            this.authorLoading = false;
            this.answerVisiable = false;
            this.getQuestion();
          } else {
            this.$Message.error("回答失败，请稍后再试");
          }
        });
    },

    changeAskModelVisiable(status) {
      this.askModelVisiable = status;
    },

    updateContent(content, contentText) {
      this.answerContent = content;
      this.answerExperct =
        contentText.length > 100 ? contentText.slice(0, 100) : contentText;
    },

    showAnswerPart() {
      this.answerVisiable = true;
      this.getAuthorInfo();
    }
  }
};
</script>

<style>
.question-header {
  background-color: #fff;
  box-shadow: 0 2px 2px 0 #e8e8e8;
}

.question-header-content {
  padding: 15px 20px 0px 20px;
  margin-top: 5px;
}

.question-header-footer {
  padding-bottom: 15px;
  margin-left: 20px;
  margin-bottom: 10px;
}

#focusanswer {
  font-size: 0.7rem;
}

#focusanswer span {
  color: #fff;
}

#focusanswer:hover {
  background-color: #0077e7;
}

#inviteanswer {
  font-size: 0.7rem;
  background-color: #fff;
  border-color: #8e909f
}

#inviteanswer:hover {
  background-color: #f8f8fa;
}

#inviteanswer span{
  margin-left: 0;
}

.el-icon-user {
  color: #8e909f;
}

.no-answer {
  height: 102px;
  padding: 50px 0;
  text-align: center;
  line-height: 102px;
  font-size: 0.8rem;
  color: #8e909f;
}

.avatar {
  float: left;
}

.userinfo {
  margin-bottom: 10px;
}

.answer-card {
  margin-bottom: 10px;
}

.answer-card .rich-text-editor {
  width: 668px !important;
}

#cancelanswer {
  font-size: 0.7rem;
  float: right;
}

#submitanswer {
  font-size: 0.7rem;
  float: right;
  margin-right: 10px;
}

#submitanswer span{
  color: #fff;
}
</style>