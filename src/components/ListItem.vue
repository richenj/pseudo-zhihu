<template>
  <el-card shadow="never" class="el-card-ex">
    <div class="answer-main">
      <div class="title" v-if="showPart.indexOf('title') >= 0">
        <!-- 问题标题 -->
        <!-- 含type判断 -->
        <!-- <h2>{{transtedInfo.title}}</h2> -->
        <!-- Mock数据用 -->
        <!-- <h3>{{item.question.title}}</h3> -->
        <!-- 请求数据用 -->
        <!-- P195 -->
        <h3>
          <router-link
            :to="{name: type === 0 ? 'detailsArticle' : 'detailsQuestion',
              params: {
                id: item.id
              }}"
            class="item-title"
          >
          <!-- {{item.title}} -->
          {{transtedInfo.title}}
          <!-- {{this.item.title}} -->
          </router-link>
          <!-- <el-button @click="foldX()">收起测试</el-button> -->
        </h3>
      </div>

      <div class="creater-info" v-if="showPart.indexOf('creater') >= 0">
        <div class="avatar">
          <img :src="item.auther.avatarUrl" alt />
        </div>
        <div class="userinfo">
          <p class="username">{{item.author.name}}</p>
          <p class="headline">{{item.author.headline}}</p>
        </div>
      </div>

      <div class="vote" v-if="showPart.indexOf('votes') >= 0">
        <!-- <span>{{JSON.parse(item.status.voteUp).length}}</span> -->
      </div>

      <div class="content-wrapper" clearfix>
        <div class="shortCut" v-if="showType === 'experct'">
          <div class="cover" v-if="transtedInfo.cover">
            <img :src="transtedInfo.cover" alt />
          </div>
          <div class="experct">
            <!-- 回答简介 -->
            <!-- <span>{{item.author.name}}：</span>
            <span v-html="item.excerpt"></span>-->
            <span>{{item.author.name}}：{{item.excerpt}}</span>
            <el-button class="btn-no-padding" type="text" @click="showType='all'">
              <span>...</span>
              <span style="color: #224899">阅读全文</span>
              <i class="el-icon-arrow-down" style="color: #224899; margin-left: 5px"></i>
            </el-button>
          </div>
        </div>

        <div class="content" v-if="showType === 'all'">
          <div class="all">
            <div style="margin-bottom: 5px; margin-top: 3px">{{item.author.name}}</div>
            <span v-html="item.content"></span>
          </div>
          <!-- <el-button class="btn-no-padding" type="text" @click="showType = 'experct'">
            收起
            <i class="el-icon-arrow-up"></i>
          </el-button> -->
        </div>
      </div>

      <!-- Mock数据用 -->
      <!-- <list-item-actions
        :comment_count="33"
        :voteup_count="44"
        :showActionItems="['vote', 'comment', 'share', 'favorite', 'like', 'more']"
      />-->
      <!-- 请求数据用 -->
      <div class="class-main">
        <list-item-actions
          v-bind="$attrs"
          v-on="$listeners"
          :type="type"
          :itemId="item.id"
          :comment_count="item.commentCount"
          
          :relationship="33"
          :showActionItems="showActionItems"
          :showType="showType"
          :commentShowType="showType"
          @foldX="foldX()"
        />
        <!-- :voteup_count="JSON.parse(item.status.voteUp).length" -->
      </div>
    </div>
  </el-card>
</template>

<script>
import ListItemActions from "@/components/ListItemActions.vue";

// methods: {
//     foldAll: () => {
//       this.showType = 'experct'
//       console.log(this.showType)
//     }
// }

export default {
  props: ["item", "showPart", "type"],

  components: {
    ListItemActions
  },

  data() {
    return {
      showType: "experct",
      showActionItems: ["vote", "comment", "share", "favorite", "like", "more"]
    };
  },

  computed: {
    transtedInfo() {
      // if (this.type === "article")
      if (this.type === 0)
      {
        return {
          title: this.item.title,
          cover: this.item.image_url || ""
        };
      }
      // else if (this.type === "answer")
      else if (this.type === 1)
      {
        return {
          title: this.item.question.title,
          cover: this.item.thumbnail || ""
        };
      } else return {};
    }
  },

  methods: {
    foldX() {
      this.showType = 'experct';
      // console.log(this.showType);
    }
  }
};
</script>

<style>
.item-title {
  color: black;
}

.item-title:hover {
  color: #16418f;
}

.experct span {
  color: #000;
}

/* 写着span，但v-html展开后其实是p */
.all p {
  color: #000;
  margin-bottom: 10px;
}

.answer-main h3 {
  text-align: left;
  padding-bottom: 10px;
}
</style>