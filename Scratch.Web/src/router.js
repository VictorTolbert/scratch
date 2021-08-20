import { createRouter, createWebHistory, RouterView } from 'vue-router'
export const routerHistory = createWebHistory()

export const router = createRouter({
  history: routerHistory,
})
