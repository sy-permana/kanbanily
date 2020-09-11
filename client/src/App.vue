<template>
    <div>
        <transition name="fade">
        <LoginPage
            v-if="pageName === 'login-page'"
            v-on:login="login"
            v-on:changePage="changePage"
            v-on:checkAuth="checkAuth"
        ></LoginPage>
        <RegisterPage
            v-if="pageName === 'register-page'"
            v-on:register="register"
            v-on:changePage="changePage"
        ></RegisterPage>
        <HomePage
            v-if="pageName === 'home-page'"
            v-bind:categories="categories"
            v-bind:loggedIn="loggedIn"
            v-bind:tasks="tasks"
            v-on:createTask="createTask"
            v-on:logout="logout"
            v-on:deleteTask="deleteTask"
            v-on:updateTask="updateTask"
        ></HomePage>
        </transition>
        <EditPage
            v-if="pageName === 'home-page'"
            v-bind:toEdit="toEdit"
            v-on:updatedTask="updatedTask"
        ></EditPage>
    </div>
</template>

<script>
import axios from './config/axios';
import moment from 'moment';

import LoginPage from './components/Login-Page';
import RegisterPage from './components/Register-Page';
import HomePage from './components/Home-Page';
import EditPage from './components/Kb-edit'

export default {
    name : 'App',
    data() {
        return {
            pageName : 'login-page',
            loggedIn : {
                name : "",
                email : ""
            },
            categories : [
                {
                    name : 'backlog'
                },
                {
                    name : 'todo'
                },
                {
                    name : 'doing'
                },
                {
                    name : 'done'
                },
            ],
            tasks : [],
            toEdit : ''
        };
    },
    components : {
        LoginPage,
        RegisterPage,
        HomePage,
        EditPage
    },
    methods: {
        checkAuth() {
            if(localStorage.access_token) {
                this.changePage('home-page');
                this.fetchTask();
            } else {
                this.changePage('login-page');
            }
        },
        changePage(page) {
            this.pageName = page;
            this.loggedIn.name = localStorage.name;
            this.loggedIn.email = localStorage.email;
        },
        login (payload) {
            const { email, password } = payload;
            axios
                .post('/login', {
                    email,
                    password
                })
                .then(({ data }) => {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('email', data.email);
                    this.changePage('home-page');
                    this.checkAuth()
                })
                .catch(function (error) {
                    console.log(error.toJSON());
                });
        },
        register (data) {
            const { name, email, password } = data;
            axios
                .post('/register', {
                    name,
                    email,
                    password
                })
                .then(({ data }) => {
                    this.changePage('login-page');
                })
                .catch(console.log)
        },
        logout () {
            localStorage.clear();
            this.changePage('login-page');
        },
        fetchTask() {
            axios
                .get('/tasks', {
                    headers : {
                        access_token : localStorage.access_token
                    }
                })
                .then(({ data }) => {
                    this.tasks = data.tasks;
                })
                .catch(console.log)
        },
        createTask(data) {
            const { title, category } = data;
            axios
                .post(`/tasks/${category}`, {
                    title
                }, {
                    headers : {
                        access_token : localStorage.access_token
                    }
                })
                .then(({data}) => {
                    this.checkAuth()
                    this.sweetAlert('success', {
                        title : data.msg,
                        text : null
                    })
                })
                .catch(error => {
                    console.log(error);
                })
                .then(_=> {
                    $(`#add${category}`).modal('hide')
                })
        },
        deleteTask(id) {
            const found = this.tasks.find(i => i.id == id)
            const index = this.tasks.indexOf(found);
            axios
                .delete(`/tasks/${id}`, {
                    headers : {
                        access_token : localStorage.access_token
                    }
                })
                .then(({data}) => {
                    this.sweetAlert('toast', {
                        title : data.msg,
                        text : null
                    })
                    this.tasks.splice(index, 1)
                })
                .catch(err => {
                    
                    this.sweetAlert('error', {
                        title : 'not authorized',
                        text : null
                    })
                })
        },
        updateTask(data) {
            this.toEdit = data;
        },
        updatedTask(data){
            axios
                .put(`/tasks/${data.id}`, {
                    title : data.title,
                    category : data.category
                },{
                    headers : {
                        access_token : localStorage.access_token
                    }
                })
                .then(({data}) => {
                    this.sweetAlert('success', {
                        title : data.msg,
                        text : null
                    })
                    this.checkAuth()
                })
                .catch(err => {
                    this.sweetAlert('error', {
                        title : null,
                        text : null
                    })
                })
                .then(_=> {
                    $(`#editForm`).modal('hide')
                })
        },
        sweetAlert(type, msg) {
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            })

            if(type === 'success') {
                this.$swal.fire({
                    icon: 'success',
                    title: msg.title,
                    text: msg.text
                })
            } else if (type === 'error') {
                this.$swal.fire({
                    icon: 'error',
                    title: msg.title,
                    text: msg.text
                })
            } else if (type === 'toast') {
                Toast.fire({
                icon: 'success',
                title: msg.title
            })
            }
        }
    },
    created() {
        this.checkAuth()
    }
};
</script>

<style scoped>
</style>