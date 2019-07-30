<template>
    <div class="m-3 card">
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
</template>


<script>
  export default {
    name: 'EmperorCard',
    props: {
      type: Object,
      isSelected: Boolean
    }
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
</style>
