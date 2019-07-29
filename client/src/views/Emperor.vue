<template>
    <div class="main">

        <div style="margin-left: 8rem; margin-right: 8rem;">
            <h1 class="mt-4">{{title}}</h1>
            <p>{{comment}}</p>
        </div>

        <div class="row">

            <b-container class="col-8">
                <b-row align-h="center">
                    <div class="m-3 card" v-for="(type, index) in types" :key="index">
                        <figure>
                            <img :src="type.img" style="width:100%">
                        </figure>

                        <div style="padding: 1rem; align-self: center;">
                            <h4><b>{{type.name}}</b></h4>
                        </div>

                        <div class="card-separator"/>
                        <b-card-text class="character-selection" style="padding: 1rem; margin: 0;">
                            <p>Select a gladiator</p>
                            <b-form-select v-model="selected" :options="type.characters"></b-form-select>
                        </b-card-text>

                        <div style="margin: 1rem; align-self: center;">
                            <b-button variant="success">Selected</b-button>
                        </div>
                    </div>
                </b-row>
            </b-container>

        </div>

        <div class="separator"/>

        {{oldest}}

        <!--        <b-row align-h="center">-->
        <!--            <div class="m-3 result-card row" style="overflow: hidden;">-->
        <!--                <figure class="col" style="padding: 0 !important;">-->
        <!--                    <img :src="types[0].img" style="width:100%">-->
        <!--                </figure>-->
        <!--                <figure class="col" style="padding: 0 !important;">-->
        <!--                    <img :src="types[1].img" style="width:100%">-->
        <!--                </figure>-->
        <!--            </div>-->
        <!--        </b-row>-->

    </div>
</template>

<script>
  import gql from 'graphql-tag'
  import {Types} from '../types'

  export default {
    name: 'emperor',

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

        title: `Select 2 characters`,

        comment: `The Emperor needs to decide which gladiators will fight in the Arena from the previous type selection made by
                the Ludus.`,
      }
    },
  }
</script>

<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 20rem;
        height: 27.5rem;
        border-radius: 5px;
    }

    .result-card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 42rem;
        height: 8rem;
        border-radius: 5px;
    }

    .card-separator {
        margin: 0;
        border-top: 1px solid lightgrey;
        width: 90%;
        align-self: center;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    .card-selected {
        box-shadow: 0 0 0 0.1rem rgba(94, 242, 16, 0.24) !important;
    }

    figure {
        height: 10rem;
        overflow: hidden;
        margin: 0;
    }

    figure img {
        display: block;
        border-radius: 5px 5px 0 0;
        width: 100%;
    }

    .separator {
        border-top: 1px solid lightgrey;
        margin-left: 8rem;
        margin-right: 8rem;
        margin-top: 2rem;
        margin-bottom: 2rem
    }

    .container {
        padding: 2px 16px;
        text-align: center;
    }

    .character-selection p {
        margin-top: 0;
    }
</style>
