<template>
  <div id="app">

    <NavBar/>

    <b-container fluid>
      <router-view/>
    </b-container>

  </div>
</template>

<script>
  import {NavBar} from './components/index'

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
</style>
