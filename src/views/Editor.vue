<template>
  <div class="editor">
    <editor-header @releaseArticles="releaseArticles" :title="title" :content="content" />
    <br />
    <div class="content m-t-50 ww" style="text-align: center">
      <el-upload
        v-if="imgUrl === ''"
        class="img-upload m-b-15"
        drag
        action="/imgs/upload"
        :on-success="uploadSuc"
        accept=".jpg, .jpeg, .JPG, .JPEG, .png, .PNG"
      >
        <i class="el-icon-camera"></i>
        <div class="upload-msg">添加题图</div>
      </el-upload>

      <img
        v-if="imgUrl !== ''"
        class="oldImg m-b-15"
        :src="imgUrl"
        @click="$refs.hiddenUpload.click()"
      />
    </div>
    <br />

    <div class="content m-t-50" style="width: 700px; margin: 0 auto">
      <el-input
        v-model="title"
        class="article-title m-b-15 ww"
        size="medium"
        placeholder="请输入标题（最多 50 个字）"
      />
      <!-- <quill-editor /> -->
      <rich-text-editor
        class="article-editor"
        ref="textEditor"
        :content="content"
        :placeHolder="placeHolder"
        @updateContent="updateContent"
      />
    </div>
  </div>
</template>

<script>
import EditorHeader from "@/components/EditorHeader.vue";
import RichTextEditor from "@/components/RichTextEditor.vue";
import { getCookies } from "../lib/utils.js";
import { imgDec } from "@/lib/config.js";

export default {
  components: {
    EditorHeader,
    RichTextEditor
  },

  data() {
    return {
      title: "",
      content: "",
      contentText: "",
      placeHolder: "请输入正文",
      imgUrl: ""
    };
  },

  methods: {
    updateContent(content, contentText) {
      this.content = content;
      this.contentText = contentText;
    },

    releaseArticles() {
      if (parseFloat(this.$route.params.articleId) !== 0) {
        console.log("修改文章方法");
      } else {
        this.createArticle();
      }
    },

    async createArticle() {
      console.log("发送新建文章请求");
      await this.$http
        .post("/articles", {
          content: this.content,
          excerpt:
            this.contentText.length > 100
              ? this.contentText.slice(0, 100)
              : this.contentText,
          title: this.title,
          userId: getCookies("id")
          // userId: 0,
        })
        .then(res => {
          if (res.data.status === 201) {
            this.$Message.success("文章新建成功！");
            this.$router.push({ path: "/" });
          } else {
            this.$Message.error(res.error);
          }
        });
    },

    uploadSuc(response) {
      this.imgUrl = `${imgDec}${response.fileName}`;
    }
  },

  //实例创建之前
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background: #FFFFFF");
  },
  //页面销毁之前执行
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  }
};
</script>

<style>
/* scoped无效 */
/* body {
  background-color: #fff !important;
} */

.el-upload-dragger {
  margin-top: 20px;
  width: 700px !important;
  background-color: rgb(246, 246, 246) !important;
  /* border-color: #fff !important; */
}

i.el-icon-camera {
  font-size: 200%;
  color: #cfcfcf;
  padding-top: 70px;
  margin: 0, auto !important;
}

.upload-msg {
  
}

.article-title {
  width: 700px;
  font-size: 1.5rem !important;
  /* 对placeholder无效 */
  /* font-weight: bold !important;
  color: #9b9b9b !important; */
}

.el-input__inner {
  border-color: #fff !important;
  height: 70px !important;
  margin-top: -20px;
}

/* 无效 */
/* .ql-bold .svg {
  color: gray !important;
} */

/* scoped无效？ */
/* .ql-toolbar,.ql-snow {
  width: 700px;
}
.ql-toolbar {
  width: 700px;
  border-left-color: #fff !important;
  border-right-color: #fff !important;
}
.quill-editor {
  height: 745px;
  background-color: #fff;
}
.ql-container {
  border-color: #fff !important;
}
.ql-editor,.ql-blank {
  font-size: 1rem;
  background-color: #fff;
} */

.article-editor {
  background-color: #fff;
}

.article-editor .ql-toolbar {
  width: 700px;
  border-left-color: #fff !important;
  border-right-color: #fff !important;
}

.article-editor .ql-container {
  width: 700px;
  border-color: #fff !important;
  font-size: 1rem;
}
</style>