<template>
  <p> {{ $route.params.name }} </p>
</template>

<script>
  import BDD from '../bdd'
  import { onMounted } from "vue";
  import { useRoute } from "vue-router";

    export default {
      name : 'RestaurantPage',
      setup(){
        const route = useRoute()
        const restaurant = BDD.find(restaurant => restaurant.name == route.params.name)
        onMounted(()=>{console.log(restaurant)})
      
      }
    }
</script>

<style>

</style>