

import Vue from 'vue'
import Router from 'vue-router'
import Chatroom from "./modules/chatroom/views/Chatroom";
import AuthenticationBoard from "./modules/user/views/AuthenticationBoard";
import UserProfile from "./modules/user/views/UserProfile";
import DashboardClass from "./modules/class/views/DashboardClass";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "AuthenticationBoard",
      component: AuthenticationBoard
    },
    {
      path: "/chatroom",
      name: "chatroom",
      component: Chatroom
    },
    {
      path: "/dashboard",
      name: "dashboardClass",
      component: DashboardClass
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const isPublic = to.matched.some(record => record.meta.public)
//   const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
//   const loggedIn = !!TokenService.getToken();

//   if (!isPublic && !loggedIn) {
//     return next({
//       path:'/login',
//       query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
//     });
//   }

//   // Do not allow user to visit login page or register page if they are logged in
//   if (loggedIn && onlyWhenLoggedOut) {
//     return next('/')
//   }

//   next();
// })


export default router;