// import Home from '@/view/home/home'
// import homeRouter from './home-router'
import baseRouter from './base-router'
import BaseLayout from '@/view/layout/base-layout'

const routes = [
  {
    path: '/',
    name: 'base-index',
    redirect: '/index',
    component: BaseLayout,
    children: baseRouter,
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/view/login/login'),
  // },
  {
    redirect: '/404',
    path: '*',
  },
]

export default routes
