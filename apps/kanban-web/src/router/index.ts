import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/RedirectToFirstBoard.vue'),
  },
  {
    path: '/boards/:slug',
    name: 'board',
    component: () => import('../pages/Board.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
