import { createRouter, createWebHistory } from 'vue-router'
import PublicHomePage from '@/pages/PublicHomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ThreadSetPage from '@/pages/ThreadSetPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import AdminHomePage from '@/pages/admin/AdminHomePage.vue'
import { useUserStore } from '@/stores/userStore'
import UserPage from '@/pages/UserPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ThreadSetFrom from '@/components/admin/ThreadSetFrom.vue'

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
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/threadset/:id',
      name: 'threadset',
      component: ThreadSetPage
    },
    {
      path: '/admin',
      component: AdminHomePage,
      meta: {
        requiresAdminAuth: true
      }
    },
    {
      path: '/form/threadset',
      component: ThreadSetFrom,
      meta: {
        requiresAdminAuth: true
      }
    },
    {
      path: '/user/me',
      component: UserPage,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/:pathMatch(.*)*', component: NotFoundPage }
  ]
})

export default router


router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if(to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
  if(to.meta.requiresAdminAuth && (!userStore.isAuthenticated || userStore.role.toLocaleLowerCase() !== "admin")) {
    return '/home'
  }
})