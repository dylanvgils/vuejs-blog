<template>
    <div class="row">
        <div class="col-md-12">
            <h1>New Post</h1>
            <form @submit.prevent="onSubmit">
                <div class="row">
                    <div class="form-group col-md-6">
                        <input 
                            id="title" 
                            class="form-control" 
                            type="text" 
                            placeholder="Title"
                            v-model="post.title">
                    </div>
                    <div class="form-group col-md-6">
                        <input 
                            id="permalink" 
                            class="form-control" 
                            type="text" 
                            placeholder="Permalink"
                            v-model="post.permalink">
                    </div>
                </div>
                <div class="form-group">
                    <textarea 
                        id="content" 
                        class="form-control" 
                        cols="30" 
                        rows="10" 
                        placeholder="Content..."
                        v-model="post.content">
                    </textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    import { CREATE_POST } from '../../store/types';

    export default {
        data() {
            return {
                post: {
                    title: '',
                    permalink: '',
                    content: ''
                }
            };
        },
        methods: {
            onSubmit() {
                this.$store.dispatch(CREATE_POST, this.post);
                this.$router.push('/');
            }
        }
    }
</script>

<style>

</style>
