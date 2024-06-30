<template>
    <div class="restaurant-card">
        <div :style="[changeBackground,borderRadius]" class="restaurant-image">

        </div>
        <div class="restaurant-information">
            <div class="top">
                <p class="name"> {{ info_restaurant.name }}</p>
                <p class="note">
                    <span>{{ info_restaurant.note }}</span>
                </p>
            </div>
            <p class="time">{{ info_restaurant.drive_time }}</p>
        </div>
    </div>
</template>

<script>
    import { computed } from 'vue'
// on exporte le component pour pouvoir l'utiliser hors
export default {
    name: 'RestaurantCard',
    props :{
        info_restaurant : Object
    },
    setup(props) {
        const changeBackground = computed(()=> {
            return {
                backgroundImage : `url(${props.info_restaurant.image})`,
                borderRadius : '3px'
            }
        })

        return {
            changeBackground
        }
    }
}
</script>

<!-- le style est de type sass -->
<style lang="scss">
    .restaurant-card {
        width: 32%;
        height: 30vh;

        p {
            margin: 0;
        }
    .restaurant-image {
        height: 70%;
        background-image: url('../assets/images/images.jpg');
        background-size: cover;
        background-position: center;
    }
    .restaurant-information{
        .top{
            margin: 10px 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .note{
                background: #eeeeee;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9rem;
                border-radius: 50%;
            }
        }
        .time {
            font-size: 0 0.9rem;
        }
    }

    }
</style>