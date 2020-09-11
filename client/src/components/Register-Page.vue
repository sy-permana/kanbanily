<template>
<div>
    <section id="login-page" class="container-fluid d-flex">
        <div id="login" class="shadow row justify-content-center align-items-center">
            <div class="col-12 justify-content-around">
                <div class="container">
                    <div class="login-title text-center row">
                        <h1 class="mg-auto">Register</h1>
                    </div>
                    <div class="row row-cols-sm-1 p-2 row-cols-md-2">
                        <div id="image" class="col-sm-6 col-xl-6">
                            <img src="../assets/undraw_secure_login_pdn4.svg" class="img-fluid">
                        </div>
                        <div class="login-form col-sm-6 col-xl-6">
                            <div id="login-form" class="shadow text-center container-fluid">
                                <form @submit.prevent="register">
                                    <div class="form-group shadow-sm">
                                        <input
                                        v-model="name"
                                        type="name" 
                                        class="form-control" 
                                        placeholder="Name">
                                    </div>
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
                                        <span type="submit">Register</span>
                                    </button>
                                    <small style="cursor: pointer; color: #fff;" @click="changePage"><u>Cancel</u></small>
                                </form>
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
export default {
    name : 'RegisterPage',
    data() {
        return {
            name: '',
            email: '',
            password: ''
        };
    },
    methods: {
        register() {
            this.$emit('register', {
                name : this.name,
                email : this.email, 
                password : this.password
            })
        },
        changePage() {
            this.$emit('changePage', 'login-page');
        }
    }
}
</script>

<style>

</style>