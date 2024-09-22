import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import PublicHomePage from '@/pages/PublicHomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import PublicThreadsPage from '@/pages/PublicThreadsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import AdminHomePage from '@/pages/admin/AdminHomePage.vue'
import UserPage from '@/pages/UserPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import FormEditThreadSetPage from '@/pages/admin/FormEditThreadSetPage.vue'
import FormCreateThreadSetPage from '@/pages/admin/FormCreateThreadSetPage.vue'
import AdminThreadsPage from '@/pages/admin/AdminThreadsPage.vue'
import FormEditThreadPage from '@/pages/admin/FormEditThreadPage.vue'
import FormCreateThreadPage from '@/pages/admin/FormCreateThreadPage.vue'

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
      component: PublicThreadsPage
    },
    {
      path: '/admin/threadset/:id',
      name: 'admin-threadset',
      component: AdminThreadsPage,
      meta: {
        requiresAdminAuth: true
      }
    },
    {
      path: '/admin',
      component: AdminHomePage,
      meta: {
        requiresAdminAuth: true
      }
    },
    {
      path: '/edit/threadset/:id',
      component: FormEditThreadSetPage,
      meta: {
        requiresAdminAuth: true
      }
    },
    {
      path: '/create/threadset/',
      component: FormCreateThreadSetPage,
      meta: {
        requiresAdminAuth: true
      }
    },
    {
      path: '/edit/thread/:id',
      component: FormEditThreadPage,
      meta: {
        requiresAdminAuth: true
      }
    },
    {
      path: '/create/thread/',
      component: FormCreateThreadPage,
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

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
  if (
    to.meta.requiresAdminAuth &&
    (!userStore.isAuthenticated || userStore.role.toLocaleLowerCase() !== 'admin')
  ) {
    return '/'
  }
})
