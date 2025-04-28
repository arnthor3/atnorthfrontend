import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/Home.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'HomeDashboard',
        component: () => import('@/views/home/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'support',
        name: 'Support',

        component: () => import('@/views/home/support/Support.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'data',
        name: 'Data',

        component: () => import('@/views/home/data/Data.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'manager',
        name: 'Manager',
        component: () => import('@/views/home/manager/Manager.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const store = useUserStore()
  const { isAuthenticated } = storeToRefs(store)

  if (!isAuthenticated.value) {
    await store.getSession()
  }
  if (isAuthenticated.value && to.name === 'Login') {
    next({ name: 'HomeDashboard' })
    return
  }

  if (requiresAuth && !isAuthenticated.value) {
    next({ name: 'Login' })
    return
  }
  next()
})

export default router
