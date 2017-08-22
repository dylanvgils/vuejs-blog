<template>
    <div class="row">
        <div class="col-md-12">
            <ul class="list-unstyled">
                <li class="media my-4" v-for="(post, key) in posts" :key="key">
                    <div class="media-body">
                        <router-link :to="`/post/${post.permalink}`" class="mt-0 mb-1" tag="h5"><a>{{ post.title }}</a></router-link>
                        {{ post.content | shortText }} <router-link :to="`/post/${post.permalink}`">...Read More</router-link>
                    </div>
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
        filters: {
            shortText(val) {
                if (typeof val === 'string') {
                    return val.substring(0, 500);
                }
            }
        },
        created() {
            this.$store.dispatch(FETCH_POSTS);
        }
    }
</script>

<style>

</style>

