import Vue from 'vue';
import Router from 'vue-router';
import test from '@/components/test';
import register from '@/components/register';
import login from '@/components/login';
import mainPage from '@/components/mainPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: test,
      meta: {
        forVisitors: true,
        forAuth: true
      }
    },
    {
      path: '/',
      name: 'mainPage',
      component: mainPage,
      meta: {
        forVisitors: false,
        forAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: register,
      meta: {
        forVisitors: true,
        forAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: login,
      meta: {
        forVisitors: true,
        forAuth: false
      }
    }
  ]
});
