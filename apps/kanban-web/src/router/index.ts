import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/boards' },
  {
    path: '/boards',
    name: 'boards',
    component: () => import('../pages/Boards.vue'),
  },
  {
    path: '/boards/:id',
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

