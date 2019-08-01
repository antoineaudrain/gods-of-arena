<template>
  <div>
    <b-navbar style="background: #101c29" toggleable="lg" type="dark">
      <b-navbar-brand href="#" v-on:click="$router.push('/')">Gods Of Arena</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

          <b-nav-item v-on:click="$router.push('/ludus')">Ludus</b-nav-item>
          <b-nav-item v-on:click="$router.push('/emperor')">Emperor
            <b-badge v-if="count > 0" class="m-1" pill variant="danger">{{count}}</b-badge>
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>


<script>
  import client from "../mixins/client"

  export default {
    name: 'NavBar',

    mixins: [client],

    async beforeMount() {
      const self = this
      this.subscriptionScheduledBattleCount().subscribe({
        next({data}) {
          self.count = data.scheduledBattleCount
        },
        error(error) {
          console.error(error)
        },
      })
    },

    data() {
      return {
        count: 0
      }
    },
  }
</script>