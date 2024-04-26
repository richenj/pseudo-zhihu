import Vue from 'vue';
import router from './router';
// import routes from './routes';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import Quill from 'quill';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import axios from 'axios';
import App from './App.vue';

import CommentList from "@/components/CommentList.vue";

Vue.config.productionTip = false

const { Message } = ElementUI;
Vue.prototype.$Message = Message;

axios.defaults.baseURL = '';
//让ajax携带cookie，axios默认是不让ajax请求头部携带cookie的
axios.defaults.withCredentials=true;
Vue.prototype.$http= axios;

Vue.use(ElementUI);
Vue.use(VueQuillEditor, /* { default global options } */);

Vue.component('CommentList', CommentList);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
