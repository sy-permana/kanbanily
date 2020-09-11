<template>
<div>
    <section id="login-page" class="container-fluid d-flex">
        <div id="login" class="shadow row justify-content-center align-items-center">
            <div class="col-12 justify-content-around">
                <div class="container">
                    <div class="login-title text-center row">
                        <h1 class="mg-auto">Kanbanily</h1>
                    </div>
                    <div class="row row-cols-sm-1 p-2 row-cols-md-2">
                        <div id="image" class="col-sm-6 col-xl-6">
                            <img src="../assets/undraw_secure_login_pdn4.svg" class="img-fluid">
                        </div>
                        <div class="login-form col-sm-6 col-xl-6">
                            <div id="login-form" class="shadow text-center container-fluid">
                                <form @submit.prevent="login">
                                    <div class="form-group shadow-sm">
                                        <input
                                        v-model="email"
                                        type="email" 
                                        class="form-control" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter your email">
                                    </div>
                                    <div class="form-group shadow-sm">
                                        <input
                                        v-model="password"
                                        type="password" 
                                        class="form-control" 
                                        placeholder="Password">
                                    </div>
                                    <button type="submit" class="overlayLeftBtn btn btn-block">
                                        <span type="submit">Login</span>
                                    </button>
                                </form>
                                <small>or login with</small>
                                <button v-google-signin-button="clientId" class="google-signin-button overlayLeftBtn btn btn-block">
                                     <span type="submit">Continue with Google</span>
                                </button>
                                <small style="cursor: pointer; color: #fff;" @click="changePage"><u>Click here to register</u></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import axios from '../config/axios';
export default {
    name : 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            clientId : '602537611993-0r4l7m3ud0mlfro7kfgaf9f5bo06rpbu.apps.googleusercontent.com'
        };
    },
    methods: {
        login() {
            this.$emit('login', { 
                email : this.email, 
                password : this.password
            })
        },
        changePage() {
            this.$emit('changePage', 'register-page')
        },
        OnGoogleAuthSuccess (idToken) {
            axios
                .post('/googleSign', {
                    id_token : idToken
                })
                .then(({data}) => {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('email', data.email);
                    this.$emit('changePage', 'home-page');
                    this.$emit('checkAuth');
                })
                .catch(err => {
                    console.log(err)
                })
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        },
    }
}
</script>

<style>

</style>