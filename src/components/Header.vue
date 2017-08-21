<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">Blog</router-link>

        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <router-link to="/admin/post/new" activeClass="active" class="nav-item" tag="li" v-if="uid">
                    <a class="nav-link">New Post</a>
                </router-link>
            </ul>
            <ul class="navbar-nav my-2 my-lg-0">
                 <router-link to="/signin" activeClass="active" class="nnav-item" tag="li" v-if="!uid">
                    <a class="nav-link">Sign In</a>
                </router-link>
                 <li class="nav-item" v-if="uid">
                    <a href="#" class="nav-link" @click.prevent="signOut">Sign Out</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import { SIGN_OUT, GET_USER } from '../store/types';

    export default {
        computed: {
            uid() {
                return this.$store.getters[GET_USER];
            }
        },
        methods: {
            signOut() {
                this.$store.dispatch(SIGN_OUT);
                this.$router.push('/');
            }
        }
    }
</script>

<style>

</style>

