<template>
  <div>
      <section id="homepage-bg">
        <navbar
            v-bind:loggedIn="loggedIn"
            v-on:logout="logout"
        >
        </navbar>
        <section id="home-page" class="container-fluid">
            <div class="container" style="padding-top: 20px;">
                <div class="row">
                    <!-- COMPONENTS -->
                    <KanbanCategory
                        v-for="(category, index) in categories"
                        :key="index"
                        :category="category"
                        :tasks="tasks"
                        :loggedIn="loggedIn"
                        v-on:createTask="createTask"
                        v-on:deleteTask="deleteTask"
                        v-on:updateTask="updateTask"
                    ></KanbanCategory>
                </div>
            </div>
        </section>
      </section>
  </div>
</template>

<script>
import Navbar from './Navbar';
import KanbanCategory from './Kb-Category';

export default {
    name : 'HomePage',
    data () {
        return {

        }
    },
    methods : {
        logout () {
            this.$emit('logout');
        },
        createTask(data) {
            this.$emit('createTask', data);
        },
        deleteTask(id){
            this.$emit('deleteTask', id);
        },
        updateTask(data) {
            this.$emit('updateTask', data);
        }
    },
    components : {
        Navbar,
        KanbanCategory
    },
    props : ['categories', 'loggedIn', 'tasks']
}
</script>

<style>

</style>