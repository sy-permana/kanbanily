<template>
<div  :id="category.name" class="row shadow-sm p-2 kanban-title rounded">
    <div class="d-flex justify-content-between w-100">
        <!-- NEED TO CHANGE THIS -->
        <div>
            <h1 class="top-title title text-capitalize">{{ category.name }}</h1>
        </div>
        <!-- Button trigger modal -->
        <div>
            <span style="font-size: 18px;" class="float-right">
                <i class="fas fa-plus-circle" data-toggle="modal" :data-target="`#add${category.name}`"></i>
            </span>
        </div>

        <div class="modal fade" :id="`add${category.name}`" tabindex="-1" role="dialog" aria-labelledby="addForm" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addForm">Add Task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createTask">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input
                                v-model="addtitle"
                                type="text" 
                                class="form-control" 
                                placeholder="Title">
                            </div>
                            <div class="form-group">
                                <label for="category">Category</label>
                                <input
                                type="text" 
                                class="form-control" 
                                :value="category.name" 
                                disabled>
                            </div>
                            <br>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name : 'KanbanHeader',
    data() {
        return {
            addtitle : ''
        }
    },
    props : [ 'category' ],
    methods : {
        createTask () {
            const data = {
                title : this.addtitle,
                category : this.category.name
            }
            this.$emit('createTask', data)
        }
    }
}
</script>

<style>

</style>