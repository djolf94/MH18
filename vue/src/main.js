// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import brain from "brain.js";

import Auth from './packages/auth/Auth.js';

Vue.use(VueAxios, axios);
Vue.use(Auth);
Vue.use(brain);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD5nhcX6Yqsw4Tr_Cfw19fCoXzHJnEOfuo',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

Vue.config.productionTip = false;

//navigation guard
//ako si autentifikovan a hoces negde gde nije za auth prebaci te na main
//u suprotnom idi gde si krenuo 
//slicno za visitore
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
