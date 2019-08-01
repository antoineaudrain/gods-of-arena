<template>
  <div class="main">

    <div v-if="battles">
      <div style="margin-left: 8rem; margin-right: 8rem;">
        <h1 class="mt-4">{{title}}</h1>
        <p>{{comment}}</p>
      </div>
    </div>

    <b-row v-else class="justify-content-md-center" style="margin-top: 20rem;">
      <h1 style="color: lightgrey; font-size: 9rem;">No Scheduled Battle</h1>
    </b-row>

  </div>
</template>

<script>
  export default {
    name: 'home',

    data() {
      return {
        battles: true,

        title: `Welcome to the Arena`,
        comment: `There will be shown battles chosen by the Ludus and the Emperor`,
      }
    },
  }
</script>