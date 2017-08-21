import Vue from 'vue';

import { GET_USER } from './store/types';
import store from './store';

import Home from './components/Home.vue';
import Post from './components/Post.vue';

import SignIn from './components/admin/SignIn.vue';
import AdminHome from './components/admin/AdminHome.vue';
import NewPost from './components/admin/NewPost.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/post/:permalink', component: Post },
    { path: '/signin', component: SignIn },
    { path: '/admin', component: AdminHome, 
        children: [
            { path: 'post/new', component: NewPost }
        ], beforeEnter: (from, to, next) => {
            if (store.getters[GET_USER]) next();
            else next('/signin');
        }
    }
];