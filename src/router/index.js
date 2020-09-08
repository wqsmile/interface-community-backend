import Vue from 'vue'
import VueRouter from 'vue-router'
import cookie from '@/utils/cookie.js'
import Login from '@/views/Login.vue'
import DefaultPage from '@/views/DefaultPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DefaultPage,
    redirect: '/manageTheme',
    children: [
      {
        path: '/manageTheme',
        component: () => import(/* webpackChunkName: 'documentManage' */ '@/views/main/documentManage/ManageTheme.vue')
      },
      {
        path: '/manageDocumentPage',
        component: () => import(/* webpackChunkName: 'documentManage' */ '@/views/main/documentManage/ManageDocumentPage.vue')
      },
      {
        path: '/manageDocumentContent',
        component: () => import(/* webpackChunkName: 'documentManage' */ '@/views/main/documentManage/ManageDocumentContent.vue')
      },
      {
        path: '/manageArticleTheme',
        component: () => import(/* webpackChunkName: 'articleManage' */ '@/views/main/articleManage/ManageArticleTheme.vue')
      },
      {
        path: '/manageArticle',
        component: () => import(/* webpackChunkName: 'articleManage' */ '@/views/main/articleManage/ManageArticle.vue')
      },
      {
        path: '/manageManager',
        component: () => import(/* webpackChunkName: 'managerManage' */ '@/views/main/managerManage/ManageManager.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from ,next) => {
  // console.log(to);
  if (to.path !== '/login') {
    let administrator = cookie.get('administrator')
    if (!administrator || administrator !== localStorage.getItem('administrator')) {
      localStorage.clear()
      next('/login')
      return
    }
    next();
    return;
  }
  next()
})

export default router
