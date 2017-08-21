<template>
    <div>
        <app-header></app-header>
        <div class="container">
                <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { INIT_USER, GET_USER } from './store/types';

    import Header from './components/Header.vue';
    import Home from './components/Home.vue';

    export default {
        components: {
            appHeader: Header,
            appHome: Home
        }
    }
</script>

<style>
</style>
