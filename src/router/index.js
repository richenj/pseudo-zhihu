import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import App from '../App.vue'
import Main from '../views/Main.vue'
import ListItem from '../components/ListItem.vue'
import SignUp from '../views/SignUp.vue'
import Editor from '../views/Editor.vue'
import DetailsArticle from '../views/DetailsArticle.vue'
import QuestionList from '../views/QuestionList.vue'
import QuestionListItem from '../components/QuestionListItem.vue'
import DetailsQuestion from '../views/DetailsQuestion.vue'

Vue.use(Router);

export default new Router({
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },

  mode: 'history',

  //会出现MainHeader重复的问题
  //没了？
  routes: [
    {
      path: '/helloworld',
      name: 'helloworld',
      component: HelloWorld,
    },

    {
      path: '/',
      component: App,
      children: [{
        path: '',
        component: Main,
        children: [{
          path: '',
          name: 'home',
          component: ListItem
        }]
      }]
    },

    //MY
    //   {
    //     path: '/',
    //     component: Main,
    //     // name: main,
    //     children: [{
    //       path: '/components/',
    //       component: ListItem,
    //     }]
    //   },

    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      //   children: [{
      //     path: '/components/',
      //     component: SignUpCore,
      // }]
    },

    {
      path: '/editor/:articleId',
      name: 'editor',
      component: Editor,
    },

    {
      path: '/article/:id',
      name: 'detailsArticle',
      component: DetailsArticle,
    },

    // {
    //   path: '/question/:id',
    //   name: 'askModel',
    //   component: AskModel,
    // },

    {
      path: '/question-list',
      name: 'question-list',
      component: QuestionList,
      children: [{
        path: '',
        name: 'home2',
        component: QuestionListItem,
      }]
    },

    {
      path: '/question/:id',
      name: 'detailsQuestion',
      component: DetailsQuestion,
    },
  ],
})
