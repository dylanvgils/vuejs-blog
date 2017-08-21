<template>
    <div class="row">
        <div class="col-md-12">
            <h1>Sign In</h1>
            <form @submit.prevent="onSignIn">
                <div class="form-group">
                    <input 
                        class="form-control" 
                        type="text" 
                        placeholder="E-mail"
                        v-model="user.email">
                </div>
                <div class="form-group">
                    <input 
                        class="form-control" 
                        type="password" 
                        placeholder="Password"
                        v-model="user.password">
                </div>
                <button class="btn btn-primary" type="submit">Sign In</button>
            </form>
        </div>
    </div>
</template>

<script>
    import { SIGN_IN, GET_USER } from '../../store/types';

    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                }
            };
        },
        computed: {
            uid() {
                console.log('test');
                return this.$store.getters[GET_USER];
            }
        },
        watch: {
            uid(val) {
                if (val !== null && val !== undefined) {
                    this.$router.push('/admin');
                } 
            }
        },
        methods: {
            onSignIn() {
                this.$store.dispatch(SIGN_IN, this.user);
            }
        }
    }
</script>

<style>

</style>
