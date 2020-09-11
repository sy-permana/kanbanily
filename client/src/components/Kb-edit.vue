<template>
<div class="modal fade" id="editForm" tabindex="-1" role="dialog" aria-labelledby="editForm" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addForm">Add Task</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent="updatedTask">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input
                        type="text" 
                        class="form-control" 
                        id="title"
                        v-model="toEdit.title">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Category</label>
                        <select class="form-control" v-model="toEdit.category">
                            <option>backlog</option>
                            <option>todo</option>
                            <option>doing</option>
                            <option>done</option>
                        </select>
                    </div>
                    <br>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name : 'Edit-Page',
    data() {
        return {
            title : null,
            category : '',
            selected : ''
        }
    },
    props : [ 'toEdit' ],
    methods : {
        updatedTask () {
            const data = {
                id : this.toEdit.id,
                title : this.toEdit.title,
                category : this.toEdit.category
            }
            this.$emit('updatedTask', data)
        },
    },
    created() {
        this.title = this.toEdit.title
    }
}
</script>

<style>

</style>