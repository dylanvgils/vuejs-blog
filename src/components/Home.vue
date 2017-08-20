<template>
    <div class="row">
        <div class="col-md-12">
            <ul class="list-group">
                <li 
                    class="list-group-item" 
                    v-for="(post, key) in posts" 
                    :key="key">
                    <router-link :to="`/post/${key}`">{{ post.title }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { GET_POSTS, FETCH_POSTS } from '../store/types';

    export default {
        computed: {
            posts() {
                return this.$store.getters[GET_POSTS];
            }
        },
        created() {
            this.$store.dispatch(FETCH_POSTS);
        }
    }
</script>

<style>

</style>

