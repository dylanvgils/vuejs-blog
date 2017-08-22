<template>
    <div v-if="post">
        <button class="btn btn-danger float-right" @click="deletePost" v-if="uid">Delete Post</button>
        <h1>{{ post.title }}</h1>
        <p>{{ post.date | formatDate }}</p>
        <p><pre>{{ post.content }}</pre></p>
    </div>
</template>

<script>
    import moment from 'moment';

    import { GET_POST_BY_PERMALINK, FETCH_POST, DELETE_POST, GET_USER } from '../store/types';

    export default {
        computed: {
            post() {
                return this.$store.getters[GET_POST_BY_PERMALINK]([this.$route.params.permalink]);
            },
            uid() {
                return this.$store.getters[GET_USER];
            }
        },
        filters: {
            formatDate(val) {
                return moment(val).format('DD-MM-YYYY [at] HH:mm');
            }
        },
        methods: {
            deletePost() {
                this.$store.dispatch(DELETE_POST, this.post._id);
                this.$router.push('/');
            }
        },
        created() {
            this.$store.dispatch(FETCH_POST, this.$route.params.permalink);
        }
    }
</script>

<style scoped>
    pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        font-family: inherit;
    }
</style>
