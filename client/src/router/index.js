import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Game from '../views/Game.vue';
import userview from '../views/UserView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/user',
    name: 'user',
    component: userview
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
