import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import ProductDetail from '@/components/ProductDetail.vue'
import HomePage from '@/views/HomeView.vue'
import ProductPage from '@/components/ProductPage.vue' 

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
    path: '/produto/:id',
    name: 'produto',
    component: ProductDetail,
    props: true,
  },
   {
    path: '/camisetas',
    name: 'camisetas',
    component: ProductPage,
  },
   {
    path: '/calcas',
    name: 'calcas',
    component: ProductPage,
  },
   {
    path: '/jaquetas',
    name: 'jaquetas',
    component: ProductPage,
  },
   {
    path: '/bermudas',
    name: 'bermudas',
    component: ProductPage,
  },
   {
    path: '/bones',
    name: 'bones',
    component: ProductPage,
  },

{
    path: '/tenis',
    name: 'tenis',
    component: ProductPage,
  },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// router.beforeEach((to, from, next) => {
//   // Fazer um scroll para o topo da página em cada navegação
//   window.scrollTo(0, 0);
//   next();
// })

export default router
