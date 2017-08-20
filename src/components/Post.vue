<template>
    <div v-if="post">
        <router-link to="/">go to index</router-link>
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>
    </div>
</template>

<script>
    import { GET_POST_BY_PERMALINK, FETCH_POST } from '../store/types';

    export default {
        computed: {
            post() {
                return this.$store.getters[GET_POST_BY_PERMALINK]([this.$route.params.permalink]);
            }
        },
        created() {
            this.$store.dispatch(FETCH_POST, this.$route.params.permalink);
        }
    }
</script>

<style>

</style>
