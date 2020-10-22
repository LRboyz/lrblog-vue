/* eslint-disable */
let baseRouter = [
  {
    path: '/index/:category_name?/:tag_name?',

    component: () => import('@/view/home/index.vue'),
    children: [
      {
        name: 'articleList',
        path: '',
        component: () => import('@/view/article/articleListItem.vue'),
      },
      {
        name: 'articleDetail',
        path: '/article/:id?',
        component: () => import('@/view/article/articleDetail.vue'),
      },
    ],
    meta: { title: '首页' },
  },
  {
    path: '/time',
    name: 'time',
    component: () => import('@/view/time/index.vue'),
    meta: { title: '时间轴' },
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import('@/view/tag/allTag.vue'),
    meta: { title: '标签' },
  },
  // {
  //   path: '/index/:category_name?',
  //   name: 'categoryList',
  //   component: () => import('@/component/layout/articleList'),
  //   meta: { title: '文章列表' },
  // },
  // {
  //     path: '/subscribe',
  //     name: 'subscribe',
  //     component: () => import("@/view/subscribe/subscribe-article.vue"),
  //     meta: { title: '关注' },
  // },
  // {
  //     path: '/docs',
  //     name: 'docs',
  //     component: () => import("@/view/home/docs.vue"),
  //     meta: { title: '文档' },
  // },
  // {
  //     path: '/tag/subscribe/:tab',
  //     name: 'tag-list',
  //     component: () => import("@/view/tag/tag-list.vue"),
  //     meta: { title: '标签列表页' },
  // },
  // {
  //     path: '/tag/:id',
  //     name: 'tag-detail',
  //     component: () => import("@/view/tag/tag-detail.vue"),
  //     meta: { title: '标签详情页' },
  // },
  // {
  //     path: '/comment',
  //     name: 'comment',
  //     component: () => import("@/view/comment/comment-list.vue"),
  //     meta: { title: '评论' },
  // },
  // {
  //     path: '/post/:id',
  //     name: 'post',
  //     component: () => import("@/view/article/article-detail.vue"),
  //     meta: { title: '随笔详情页' },
  //     children: []
  // },
  {
    path: '/user/:id/:name',
    name: 'user',
    component: () => import('@/view/user/index.vue'),
    meta: { title: '我的主页' },
  },
  {
    path: '/login-result',
    name: 'login-result',
    component: () => import('@/view/account/login-result.vue'),
    meta: { title: '第三方登录' },
  },
  {
    path: '/bind-result',
    name: 'bind-result',
    component: () => import('@/view/account/bind-result.vue'),
    meta: { title: '第三方账号绑定' },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/view/error-page/404.vue'),
    meta: { title: '404' },
  },
]
export default baseRouter
