<template>
  <div class = "ww">
    <!-- <quill-editor />
    <div>test</div> -->
    <quill-editor
      class="rich-text-editor"
      v-model="value"
      ref="myQuillEditor"
      :options="options"
      @change="updateRichText($event)"
    ></quill-editor>

    <el-upload
      class="hidden"
      action="/imgs/upload"
      :on-success=uploadSuc
      accept=".jpg,.jpeg,.JPG,.JPEG,.png,.PNG"
    >
      <div ref="hiddenUpload"></div>
    </el-upload>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
// import { imgDec } from '@/lib/config.js';

export default {
  props: ["content", "placeHolder"],
  components: {
    quillEditor
  },
  data() {
    return {
      value: "",
      options: {
        modules: {
          toolbar: [
            ["bold", "italic"],
            [
              { header:2 },
              "blockquote",
              "code-block",
              { list: "ordered" },
              { list: "bullet" }
            ],
            ["link", "image"],
            ["clean"]
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        }
      }
    };
  },

  mounted() {
    // this.$refs.myQuillEditor.quill.root.dataset.placeholder = this.placeHolder;
    //替换图片上传方法
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image',this.imgHandler);
  },

  methods: {
    updateContent(content) {
      this.$refs.myQuillEditor.quill.root.innerHTML = content;
    },

    updateRichText(content) {
      this.$emit("updateContent", content.html, content.text);
    },

    imgHandler(image) {
      if (image) {
        this.$refs.hiddenUpload.click();
      }
    },

    // uploadSuc(response) {
    uploadSuc() {
      // const url = `${imgDec}${response.fileName}`;
      //一个测试图片的真实链接
      const fake = 'https://imgchr.com/i/YguU74';
      this.$refs.myQuillEditor.quill.insertEmbed(this.$refs.myQuillEditor.quill.getSelection(), 'image', fake);
    },

  }
};
</script>

