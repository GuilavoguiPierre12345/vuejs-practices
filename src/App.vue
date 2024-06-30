<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link :to="{name:'LoginRoute', params:{param1: 'Parametre 1'}}" class="nav-link active" aria-current="page" >Login Page</router-link>
        <router-link :to="{name:'HomeRoute', params:{param2: 'Parametre 2'}}" class="nav-link active" aria-current="page" >Home</router-link>
        <router-link :to="{name:'AboutRoute', params:{param3: 'Parametre 3'}}" class="nav-link">About</router-link>
      </div>
    </div>
  </div>
</nav>
<router-view></router-view>
</template>

<script>
// import HomeComponentVue from './components/HomeComponent.vue'
// import AboutComponentVue from './components/AboutComponent.vue';

export default {
  name: 'App',
  components: {
    // 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
