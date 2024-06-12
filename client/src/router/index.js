import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import GameView from '../views/Game.vue';
import UserView from '../views/UserView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/game',
    name: 'Game',
    component: GameView,
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('user');
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    alert('You must be logged in to see this page');
    next('/');
  } else {
    next();
  }
});

export default router;
