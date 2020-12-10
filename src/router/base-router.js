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
    path: '/about',
    name: 'about',
    component: () => import('@/view/about/index.vue'),
    meta: { title: '关于博主' },
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import('@/view/tag/allTag.vue'),
    meta: { title: '标签' },
  },
  {
    path: '/tag/:id',
    name: 'tag-detail',
    component: () => import('@/view/tag/tag-detail.vue'),
    meta: { title: '标签详情页' },
  },
  {
    path: '/user/:id/:name',
    name: 'user',
    component: () => import('@/view/user/index.vue'),
    meta: { title: '我的主页' },
  },
  // {
  //   path: '/login-result',
  //   name: 'login-result',
  //   component: () => import('@/view/account/login-result.vue'),
  //   meta: { title: '第三方登录' },
  // },
  // {
  //   path: '/bind-result',
  //   name: 'bind-result',
  //   component: () => import('@/view/account/bind-result.vue'),
  //   meta: { title: '第三方账号绑定' },
  // },
  {
    path: '/404',
    name: '404',
    component: () => import('@/view/error-page/404.vue'),
    meta: { title: '404' },
  },
]
export default baseRouter
