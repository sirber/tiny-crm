import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

import { useUserStore } from '@/stores/user'

import Home from '@/components/Home.vue'
import Dashboard from '@/components/Dashboard.vue'
import About from '@/components/About.vue'
import Profile from '@/components/profile/UserProfile.vue'
import Login from '@/components/admin/UserLogin.vue'
import NotFound from '@/components/NotFound.vue'

/* People */
import PeopleList from '@/components/people/PeopleList.vue'
import PeopleView from '@/components/people/PeopleView.vue'

/* Products */
import Products from '@/components/products/Products.vue'
import Transactions from '@/components/products/Transactions.vue'
import Inventory from '@/components/products/Inventory.vue'

/* Tools */
import Expenses from '@/components/tools/Expenses.vue'
import Travels from '@/components/tools/Travels.vue'

/* Admin */
import UserList from './components/admin/users/UserList.vue'
import UserView from './components/admin/users/UserView.vue'

function ifNotAuthenticated(_to: any, _from: any, next: Function) {
  const userStore = useUserStore()
  userStore.isAuthenticated ? next('/') : next()
}

function ifAuthenticated(_to: any, _from: any, next: Function) {
  const userStore = useUserStore()
  userStore.isAuthenticated ? next() : next('/login')
}

function ifAdmin(_to: any, _from: any, next: Function) {
  const userStore = useUserStore()
  userStore.isAuthenticated && userStore.isAdmin ? next() : next('/')
}

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/dashboard', component: Dashboard, beforeEnter: ifAuthenticated },
  { path: '/profile', component: Profile, beforeEnter: ifAuthenticated },
  { path: '/login', component: Login, beforeEnter: ifNotAuthenticated },

  // Custoemrs
  {
    path: '/contact',
    component: PeopleList,
    beforeEnter: ifAuthenticated,
    props: { type: 'contact' }
  },
  {
    path: '/contact/:id',
    component: PeopleView,
    beforeEnter: ifAuthenticated,
    props: { type: 'contact' }
  },
  {
    path: '/prospect',
    component: PeopleList,
    beforeEnter: ifAuthenticated,
    props: { type: 'prospect' }
  },
  {
    path: '/prospect/:id',
    component: PeopleView,
    beforeEnter: ifAuthenticated,
    props: { type: 'prospect' }
  },
  {
    path: '/customer',
    component: PeopleList,
    beforeEnter: ifAuthenticated,
    props: { type: 'customer' }
  },
  {
    path: '/customer/:id',
    component: PeopleView,
    beforeEnter: ifAuthenticated,
    props: { type: 'customer' }
  },

  // Products
  { path: '/product', component: Products, beforeEnter: ifAuthenticated },
  {
    path: '/transaction',
    component: Transactions,
    beforeEnter: ifAuthenticated
  },
  { path: '/inventory', component: Inventory, beforeEnter: ifAuthenticated },

  // Tools
  { path: '/expense', component: Expenses, beforeEnter: ifAuthenticated },
  { path: '/travel', component: Travels, beforeEnter: ifAuthenticated },

  // User
  { path: '/profile', component: Profile, beforeEnter: ifAuthenticated },

  // Admin / Users
  { path: '/admin/user', component: UserList, beforeEnter: ifAdmin },
  { path: '/admin/user/:id', component: UserView, beforeEnter: ifAdmin },

  // Not Found
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
