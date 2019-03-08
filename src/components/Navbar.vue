<template>
  <div class="navbar">    
    <nav class="nav-extended black darken-2">
        <div class="nav-content">
            <router-link :to="{ name: 'Index' }">
                <span class="nav-title">Team List</span>
            </router-link>
            <a href="" class="btn-floating btn-large halfway-fab light-green">
            <router-link :to="{ name: 'AddTeams' }">
                <i class="material-icons">add</i>
            </router-link>
            </a>
        </div>

    </nav>
  
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data()
  {

  }
}
</script>

<style>
.navbar nav{
    padding: 0 20px;
}
</style>
