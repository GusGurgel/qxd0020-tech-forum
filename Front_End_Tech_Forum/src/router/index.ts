import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import HomeView1 from '../pages/HomeView1.vue'
import HomeView2 from '../pages/HomeView2.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home1',
      name: 'home1',
      component: HomeView1
    },
    {
      path: '/home2',
      name: 'home2',
      component: HomeView2
    },
  ]
})

export default router
