import { createApp } from 'vue'

import App from './App.vue'

import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from './page/HomePage.vue'
import RestaurantPage from "./page/RestaurantPage.vue";

const routes = [
    { path : '/', component: HomePage, name: 'home'},
    {path : '/restaurant/:name', component: RestaurantPage,name:'RestaurantPage'},
]

const router = createRouter({
    history : createWebHashHistory(),
    routes
})

const VueApp = createApp(App)
VueApp.use(router)
VueApp.mount('#app')

