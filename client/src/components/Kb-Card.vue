<template>
    <div class="row p-2 shadow-sm each-kanban rounded"
        :class="[task.User.email == loggedIn.email ? `own border-${task.category}` : `border-${task.category}`]"
        >
        <div class="container p-0 m-0">
            <div class="row p-0 m-0" >
                <div class="col-11 p-0 text-left">
                    <h1>{{ task.title }}</h1>
                </div>
                <div class="col-1 p-0 text-right">
                    <div class="dropdown">
                        <span 
                            class="fas fa-ellipsis-v"  
                            id="dropdownMenu1" 
                            data-toggle="dropdown" 
                            aria-haspopup="false" 
                            aria-expanded="false"
                            style="cursor: pointer;"
                        >
                        </span>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                            <a class="dropdown-item" href="#" @click.prevent="updateTask" data-toggle="modal" data-target="#editForm">Edit</a>
                            <a class="dropdown-item" href="#" @click.prevent="deleteTask">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row p-0 m-0" >
                <span class="identity">
                    <small>{{ task.User.email }}</small><br>
                    <small>{{ task.createdAt.split('T')[0] }}</small>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'KanbanCard',
    data() {
        return {
            id : this.task.id,
            title : this.task.title,
            category : this.task.category
        }
    },
    props : [ 'task', 'loggedIn' ],
    methods : {
        deleteTask() {
            this.$emit('deleteTask', this.id)
        },
        updateTask() {
            const data = {
                id : this.id,
                title : this.title,
                category : this.category
            }
            this.$emit('updateTask', data)
        }
    }
}
</script>

<style>

</style>