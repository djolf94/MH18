// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Auth from './packages/auth/Auth.js';

Vue.use(VueAxios, axios);
Vue.use(Auth);

Vue.config.productionTip = false;

//navigation guard
//ako si autentifikovan a hoces negde gde je za visitore prebaci te na main
//a ako si visitor idi gde si krenuo
//slicno ako nisi auth a hoces na main
router.beforeEach (
  (to, from, next) => {
    if (Vue.auth.isAuthenticated()) {
      if (!to.matched.some(record => record.meta.forAuth)) {
        next ({
          path: '/'
        });
      }
      else 
        next();
    }
    else if (!Vue.auth.isAuthenticated()) {
      if (!to.matched.some(record => record.meta.forVisitors)) {
        next ({
          path: '/login'
        });
      }
      else 
        next();
    }
    else
      next();
  }
);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
