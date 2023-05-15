import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (RegisterView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (RegisterView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DashboardView.vue')
    }
  ]
})


router.beforeEach( (to, from, next) => {

  const authStore = useAuthStore();
  
  const publicPages = ['/', '/login', '/register'];

  const authRequired = !publicPages.includes(to.path);
  const loggedIn = authStore.loggedIn();

  if (authRequired && !loggedIn) {
    return next('/');
  }

  next();
})





export default router
