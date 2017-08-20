import Vue from 'vue';
import VueRouter from 'vue-router';
import AxiosPlugin from './plugins/axios';

import store from './store';
import { routes } from './routes';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(AxiosPlugin);

Vue.http.defaults.baseURL = 'https://vuejs-blog-fb7d1.firebaseio.com/';

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
