import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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

const router = new VueRouter({
  routes
})

export default router
