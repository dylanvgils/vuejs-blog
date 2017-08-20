import Home from './components/Home.vue';
import Post from './components/Post.vue';

import AdminHome from './components/admin/AdminHome.vue';
import NewPost from './components/admin/NewPost.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/post/:permalink', component: Post },
    { path: '/admin', component: AdminHome, children: [
        { path: 'post/new', component: NewPost }
    ]}
];