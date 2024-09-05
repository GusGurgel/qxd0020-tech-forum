import { createRouter, createWebHistory } from 'vue-router'
import PublicHomePage from '@/pages/PublicHomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ThreadContainer from '@/components/ThreadContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PublicHomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/threadset/:id',
      name: 'threadset',
      component: ThreadContainer
    }
  ]
})

export default router
