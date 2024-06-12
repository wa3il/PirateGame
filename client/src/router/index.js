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
    component: GameView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
