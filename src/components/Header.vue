<template>
    <div>
        <router-link to="/">Home</router-link> |
        <a href="" @click.prevent="signOut">signOut</a> |
        <router-link to="/admin/post/new">New post</router-link>
    </div>
</template>

<script>
    import { SIGN_OUT } from '../store/types';

    export default {
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

