import firebase from 'firebase';
import Vue from 'vue';
import VueRouter from 'vue-router';

import { SET_USER } from './store/types';

import AxiosPlugin from './plugins/axios';
import store from './store';
import { routes } from './routes';
import App from './App.vue';

// Add plugins to vue
Vue.use(VueRouter);
Vue.use(AxiosPlugin);

// Set default url for Axios
Vue.http.defaults.baseURL = 'https://vuejs-blog-fb7d1.firebaseio.com/';

// Configure router
const router = new VueRouter({
    mode: 'history',
    routes
});

const unsubscribe = firebase.initializeApp({
    apiKey: 'AIzaSyBwmwmJ7yBUMC8-yEEBX9k_U3LVNPcJJp8',
    authDomain: 'vuejs-blog-fb7d1.firebaseapp.com',
    databaseURL: 'https://vuejs-blog-fb7d1.firebaseio.com/',
    storageBucket: ''
}).auth().onAuthStateChanged(user => {
    if (user) store.commit(SET_USER, user.uid);
    else if (user) store.commit(SET_USER, null);
    
    new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    });

    unsubscribe();
});
