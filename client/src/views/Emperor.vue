<template>
    <div class="main">

        <div style="margin-left: 8rem; margin-right: 8rem;">
            <h1 class="mt-4">{{title}}</h1>
            <p>{{comment}}</p>
        </div>

        <div class="row">

            <b-container class="col-8">
                <b-row align-h="center">
                    <EmperorCard :type="types[oldest.first]"/>
                    <EmperorCard :type="types[oldest.second]"/>
                    <EmperorCard v-id="oldest.withAnimal" :type="animalType"/>
                </b-row>
            </b-container>

        </div>

        <div class="separator"/>
    </div>
</template>

<script>
  import gql from 'graphql-tag'
  import {Types, AnimalType} from '../types'
  import {EmperorCard} from '../components/index'

  export default {
    name: 'emperor',

    components: {
      EmperorCard
    },

    apollo: {
      oldest: {
        query: gql`query {
          oldest{
            first
            second
            withAnimal
          }
        }`,
        update: data => data.oldest
      }
    },

    data() {
      return {
        oldest: {},
        types: Types,
        animalType: AnimalType,

        title: `Select 2 characters`,
        comment: `The Emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by
                the Ludus.`,
      }
    },
  }
</script>
