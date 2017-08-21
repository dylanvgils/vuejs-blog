<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <p>{{ post.date | formatDate }}</p>
        <p>{{ post.content }}</p>
    </div>
</template>

<script>
    import moment from 'moment';

    import { GET_POST_BY_PERMALINK, FETCH_POST } from '../store/types';

    export default {
        computed: {
            post() {
                return this.$store.getters[GET_POST_BY_PERMALINK]([this.$route.params.permalink]);
            }
        },
        filters: {
            formatDate(val) {
                return moment(val).format('DD-MM-YYYY [at] HH:mm');
            }
        },
        created() {
            this.$store.dispatch(FETCH_POST, this.$route.params.permalink);
        }
    }
</script>

<style>

</style>
