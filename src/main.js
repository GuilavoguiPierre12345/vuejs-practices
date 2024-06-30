
import { createApp } from 'vue'
import App from './App.vue'

// importation du module vue-router
import {createRouter, createWebHashHistory} from 'vue-router'

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';


// importation des composants
import HomeComponentVue from './components/HomeComponent.vue';
import AboutComponentVue from './components/AboutComponent.vue';
import LoginComponentVue from './components/LoginComponent.vue'

// definitions des routes
const routes = [
    {name:'HomeRoute', path: '/home/:param2', component: HomeComponentVue},
    {name:'AboutRoute', path: '/about/:param3', component: AboutComponentVue},
    {name:'LoginRoute', path: '/:param1', component: LoginComponentVue}
];

// creation de l'instance d'une route
const router = createRouter({
    history : createWebHashHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount("#app")

