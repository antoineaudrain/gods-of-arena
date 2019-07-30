<template>
    <div class="main">

        <div style="margin-left: 8rem; margin-right: 8rem;">
            <h1 class="mt-4">{{title}}</h1>
            <p>{{comment}}</p>
        </div>

    </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'home',

    data() {
      return {
        title: `Gods of Arena`,

        comment: `Lorem ipsum ...`,
      }
    },
  }
</script>