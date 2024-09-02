import { createRouter, createWebHistory } from "vue-router";
import Home from '@/components/home/Home.vue'
import Posts from '@/components/posts/Posts.vue'
import PostDetails from '@/components/posts/PostDetails.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
  },
  {
    path: '/posts',
    name: 'PostsPage',
    component: Posts,
  },
  {
    path: '/post/:id',
    name: 'PostDetailsPage',
    component: PostDetails,
  }
];

const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;