<template>
    <div class="col-3 kanban-container p-0">
        <div class="container p-0">
            <!-- title component -->
            <KanbanHeader
                v-bind:category="category"
                v-on:createTask="createTask"
            >
            </KanbanHeader>
        </div>
        <div class="container each-kanban-container p-0 overflow-auto mt-2 scroll-style rounded">
            <!-- kanban card component -->
            <KanbanCard
                v-for="task in filteredTasks"
                :key="task.id"
                v-bind:task="task"
                v-bind:loggedIn="loggedIn"
                v-on:deleteTask="deleteTask"
                v-on:updateTask="updateTask"
            ></KanbanCard>
        </div>
    </div>
</template>

<script>
import KanbanCard from './Kb-Card';
import KanbanHeader from './Kb-Header';

export default {
    name : 'KanbanCategory',
    components : {
        KanbanCard,
        KanbanHeader
    },
    props : [ 'category', 'tasks', 'loggedIn' ],
    computed : {
        filteredTasks() {
            return this.tasks.filter(task => task.category === this.category.name)
        }
    },
    methods : {
        createTask(data) {
            this.$emit('createTask', data);
        },
        deleteTask(id) {
            this.$emit('deleteTask', id);
        },
        updateTask(data) {
            this.$emit('updateTask', data);
        }
    }
}
</script>

<style>

</style>