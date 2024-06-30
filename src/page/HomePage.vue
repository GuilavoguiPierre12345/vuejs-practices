<template>
  <div class="home">
    <div class="header">
      <img src="../assets/images/logo.png" alt="">
      
      <div class="wrapper-input">
        <input v-model="user_search_restaurant" type="text" name="" id="" placeholder="what do you want ?">
        <div class="search">
          <router-link v-for="(restaurant, i) in search_restaurant" :key="i" :to="{name : 'RestaurantPage', params : {name:restaurant.name}}">
            <div class="container-restaurant-search">
              <div class="wrapper-img">
                <img :src="restaurant.image" alt="">
              </div>
              <h2>{{ restaurant.name }} </h2>
            </div>
          </router-link>
        </div>
      </div>

    </div>
    <div class="banniere">

    </div>
    <restaurant-row v-for="(data, i) in data_restaurant" :key="i" :three_restaurant="data"/>
  </div>
</template>

<script>
// IMPORTS
import BDD from '@/bdd.js';
import { onMounted, ref, watch } from 'vue';
// COMPONENTS
import RestaurantRow from '@/components/RestaurantRow.vue';


export default {
  name :'HomePage',
  components : {
    RestaurantRow
  },
  
  setup() {
    
    class Restaurant{
      constructor(name,note,image,drive_time){
        this.name = name;
        this.note = note;
        this.image = image;
        this.drive_time = drive_time;
      }
    } 
    
    let data_restaurant = ref([]) 
    let all_restaurant = [] 
    const makeDataRestaurant = ()=>{ 
        let three_restaurant = [] 
        for (const restaurant of BDD) {
          const new_restaurant = new Restaurant(restaurant.name, restaurant.note, restaurant.image, restaurant.drive_time)
          all_restaurant.push(new_restaurant)

          three_restaurant.push(new_restaurant)
          if (three_restaurant.length === 3) {
              data_restaurant.value.push(three_restaurant)
              three_restaurant =[]; 
          }
        }
        // console.log(data_restaurant);
      }
    // user search restaurant
      let user_search_restaurant = ref('') 
      let search_restaurant = ref([])
      // on veille dessus en temps réel
      watch(user_search_restaurant,new_value =>{
        let regex = RegExp(new_value.toLocaleLowerCase()) 
        let new_search_restaurant = all_restaurant.filter((restaurant) => regex.test((restaurant.name).toLocaleLowerCase()))         
        
        search_restaurant.value = new_value.length === 0 ? [] : new_search_restaurant

        })
    // ########################################################

    // on monte notre fonction au chargement de l'application
    onMounted(makeDataRestaurant);
    // on retourne data_restaurant 
    return {
      data_restaurant,
      user_search_restaurant,
      search_restaurant,
    }
  }
}
</script>

<style lang="scss">
  .home {
    .header {
      height: 120px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      img{
        width: 300px;
      }

      .wrapper-input {
        position: relative;

          input{
          background-color: #f6f6f6;
          border: none;
          outline: none;
          width: 400px;
          height: 40px;
          font-size: 24px;
          padding: 10px;
        }

        .search{
          position: absolute;
          top: 100%;
          width: 100%;
          background-color: #fff;

          .container-restaurant-search {
            display: flex;
            align-items: center;
            padding: 10px;
            &:hover{
              background-color: #f6f6f6;
              cursor: pointer;
            }

            .wrapper-img {
              height: 70px;
              width: 70px;
              margin-left: 5px;
              margin-right: 25px;
              border-radius: 50%;
              overflow: hidden;

              img {
                height: 100%;
                width:auto;
              }
            }
          }

        }
      }
    }

    .banniere {
      width: 100%;
      height: 400px;
      background-image: url('../assets/images/banner.png');
      background-size: cover;
      background-position: bottom center;
    }
  }
</style>