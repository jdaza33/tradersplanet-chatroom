import Vue from 'vue'
import Router from 'vue-router'
import Chatroom from './components/Chatroom.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_URL,
  routes: [
    {
      path: '/',
      name: 'chatroom',
      component: Chatroom
    }
  ]
})
