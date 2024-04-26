<template>
  <div class="main-list-wrapper">
    <main-list-nav :type="type" />
    <!-- <list-item /> -->

    <!-- <question-test /> -->
    <!-- <div>
          {{fakeInfo[0]}}
    </div>-->
    <!-- <list-item :item="fakeInfo[0]" :showPart="['title', 'creater', 'votes']" :type="answer"></list-item> -->

    <div class="card-content">
      <!-- <router-view
        v-for="(item, index) in fakeInfo0"
        :key="index"
        :item="item"
        :index="index"
        :type="'item.type'"
        :showPart="['title']"
        class="single-card"
      /> -->
      <router-view
        v-for="(item, index) in fakeInfo"
        :key="index"
        :item="item"
        :index="index"
        :type="item.type"
        :showPart="['title']"
        class="single-card"
      />
    </div>
  </div>
</template>

<script>
import MainListNav from "@/components/MainListNav.vue";
// import QuestionTest from "@/components/QuestionTest.vue";
// import ListItem from "@/components/ListItem.vue";

export default {
  components: {
    MainListNav
    // QuestionTest,
    // ListItem
  },

  watch: {
    $route: "fetchData"
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.loading = true;
      if (this.$route.name === "home") {
        this.getNormalList();
        this.loading = false;
      } else if (this.$route.name === "hot") {
        console.log("关注");
      } else {
        console.log("热榜");
      }
    },

    async getNormalList() {
      console.log("getNormalList 开始");
      await this.$http.get("/articles/list").then(res => {
        console.log(res.data.list);
        if (res.data.status === 200) {
          this.fakeInfo = res.data.list;
        }
      });
    }
  },

  data() {
    return {
      type: "main",
      fakeInfo: "",
      fakeInfo0: [
        {
          author: {
            author_url: "回答作者头像",
            headline: "回答作者座右铭",
            name: "回答作者用户名"
          },
          relationship: {
            is_nothelp: false,
            is_thanked: false,
            voting: 0
          },
          question: {
            author: {
              author_url: "问题作者头像",
              headline: "问题作者座右铭",
              name: "问题作者用户名"
            },
            answer_count: 18,
            comment_count: 1,
            excerpt: "问题简介",
            title: "问题标题1",
            type: "question",
            url: "问题详情链接"
          },
          comment_count: 41,
          content: "回答内容",
          excerpt:
            "（回答简介）东沙毫无疑问就是冲着台湾去的，台湾和南海是中国的重中之重，要想彻底管控南海首先就要拿下台湾，东沙群岛是第一步",
          thanks_count: 69,
          thumbnail: "回答封面图片链接",
          type: "answer",
          voteup_count: 771
        },

        {
          author: {
            author_url: "回答作者头像",
            headline: "回答作者座右铭",
            name: "回答作者用户名"
          },
          relationship: {
            is_nothelp: false,
            is_thanked: false,
            voting: 0
          },
          question: {
            author: {
              author_url: "问题作者头像",
              headline: "问题作者座右铭",
              name: "问题作者用户名"
            },
            answer_count: 18,
            comment_count: 1,
            excerpt: "问题简介",
            title: "问题标题2",
            type: "question",
            url: "问题详情链接"
          },
          comment_count: 41,
          content: "回答内容",
          excerpt:
            "（回答简介）2012年，我看了一部电影。 飞屋环游记开头，短短几分钟，讲述呆呆的男主和爱人在孩童时候的约定，长大后，和她去携手旅游、探险。",
          thanks_count: 69,
          thumbnail: "回答封面图片链接",
          type: "answer",
          voteup_count: 771
        }
      ]
    };
  }
};
</script>

<style>
.main-list-wrapper .el-card {
  margin: -1px 0 0 0;
  font-size: 0.8rem;
  /* width: 694px; */
}
</style>