<template>
  <div>
    <b-navbar style="background: #101c29" toggleable="lg" type="dark">
      <b-navbar-brand href="#" v-on:click="$router.push('/')">Gods Of Arena</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-on:click="$router.push('/ludus')">Ludus</b-nav-item>
          <b-nav-item v-on:click="$router.push('/emperor')">Emperor</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>


<script>
  import gql from 'graphql-tag'

  export default {
    name: 'NavBar',

    apollo: {
      scheduledBattleQuantity: {
        query: gql`query {
          scheduledBattleQuantity
        }`,
        update: data => data.count
      }
    },

    data() {
      return {
        count: undefined
      }
    },
  }
</script>