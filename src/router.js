/**
 * @author lsz
 * @desc 路由配置信息
 */
import Vue from 'vue'
import Router from 'vue-router'

/* 子路由注册 */
Vue.use(Router)

// 路由配置信息
const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: r => require.ensure([], () => r(require(`./components/login/Login`)), `login`)
  }]
})

// router.beforeEach((to, from, next) => {
//   let userId = to.params.userId;
//   let token = sessionStorage.getItem(userId)
//   if (to.meta.requireAuth) {
//     if (token) {
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
