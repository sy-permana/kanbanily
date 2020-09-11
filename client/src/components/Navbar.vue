<template>
  <section id="navbar" class="container-fluid text-center shadow">
        <div class="container">
            <div class="d-flex justify-content-between p-2">
                <div>
                    <h1 class="m-0 p-0 text-shadow">Kanbanily</h1>
                </div>
                <div>
                    <h1 
                        class="m-0 p-0 text-shadow" 
                        style="color: #f39800;" 
                        data-toggle="tooltip"
                        data-placement="top" 
                        title="Your Organization"
                    >
                    Hacktiv8
                    </h1>
                </div>
                <div id="user" class="shadow-sm rounded p-1 m-0 d-flex">
                    <div>
                        <h3 class="m-0 p-1">{{ loggedIn.name }}</h3>
                    </div>
                    <div class="dropdown m-0 p-1">
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
                            <span class="dropdown-item-text">{{ loggedIn.email }}</span>
                            <a  
                                @click.prevent="logout"
                                class="dropdown-item" 
                                href="#" 
                                style="color: brown;"
                            >Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name : 'Navbar',
    methods : {
        logout() {
            this.$emit('logout');
        }
    },
    props : ['loggedIn']
}
</script>

<style>

</style>