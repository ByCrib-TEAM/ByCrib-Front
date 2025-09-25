import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import ProductDetail from '@/components/ProductDetail.vue'
import CardComponent from '@/components/CardComponent.vue'
import HomePage from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/LoginPage',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/RegisterPage',
      name: 'RegisterPage',
      component: RegisterPage,
    },
    {
      path: '/CardComponent',
      name: 'CardComponent',
      component: CardComponent,
    },
    {
      path: '/produto/:id',
      name: 'produto',
      component: ProductDetail,
      props: true,
   },
  ],
})

export default router
