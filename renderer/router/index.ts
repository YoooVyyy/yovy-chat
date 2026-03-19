import { createRouter, createMemoryHistory } from 'vue-router';

export const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@renderer/views/index.vue'),
    },
  ]
})

export default router;
