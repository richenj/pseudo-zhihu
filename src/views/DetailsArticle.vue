<template>
  <div>
    <article-header :name="articleData.author.name" />
    <div class="article-details ww" v-loading="loading">
      <div class="article-wrapper">
        <div class="cover">
          <img :src="articleData.cover" alt />
        </div>
        <h1 class="title">{{articleData.title}}</h1>
        <div class="author-info" v-if="articleData.author">
          <div class="avatar">
            <img :src="articleData.author.avatarUrl || ''" alt />
          </div>
          <div class="userinfo">
            <p class="username">{{articleData.author.name}}</p>
            <p class="headline">{{articleData.author.headline}}</p>
          </div>
        </div>
        <!-- 文章主体内容 -->
        <div class="content" v-html="articleData.content"></div>
      </div>
      <!-- 文章状态 -->
      <!-- Cannot read property 'length' of undefined -->
      <!-- <list-item-actions
        v-if="articleData.status"
        :itemId="articleData.id"
        :comment_count="articleData.comment.length"
        :voteup_count="JSON.parse(articleData.status.voteUp).length"
        :relationship="33"
        :showActionItems="showActionItems"
      />-->
      <list-item-actions
        v-if="articleData.status"
        :itemId="articleData.id"
        :relationship="33"
        :showActionItems="showActionItems"
        :creatorId=1
      />
    </div>
  </div>
</template>

<script>
import ArticleHeader from "@/components/ArticleHeader.vue";
import ListItemActions from "@/components/ListItemActions.vue";

export default {
  data() {
    return {
      showActionItems: ["vote", "comment", "share", "favorite", "like", "more"],
      loading: true,
      articleData: {}
    };
  },

  components: {
    ArticleHeader,
    ListItemActions
  },

  mounted() {
    this.getArticle();
  },

  methods: {
    async getArticle() {
      console.log("开始getArticle");
      console.log(this.$route.params.id); //可以获得24
      await this.$http
        .get("/articles", {
          params: {
            articleId: this.$route.params.id,
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.articleData = res.data.content;
            this.loading = false;
          } else {
            this.$Message.error("获取文章失败,请稍后再试");
            this.$router.go(-1);
          }
        });
    }
  }
};
</script>

<style>
.article-wrapper {
  margin-bottom: 20px;
}

</style>