<template>
    <div id="app">
        <NavBar/>
        <b-container>
            <router-view/>
        </b-container>
    </div>
</template>

<script>
  import { NavBar } from './components/index'

  export default {
    name: 'app',
    components: {
      NavBar,
    }
  }
</script>

<style>


    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;

    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
