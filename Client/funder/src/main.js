import Vue from 'vue'
import App from './App.vue'
import Projects from './Projects.vue'
import Home from './Home.vue'

import PledgedProjects from './PledgedProjects.vue'
import CreatedProjects from './CreatedProjects.vue'
import CreateProject from './CreateProject.vue'
import Pledge from './Pledge.vue'

 //   __                 _
 //  / _|               | |
 // | |_ _   _ _ __   __| |_ __
 // |  _| | | | '_ \ / _` | '__|
 // | | | |_| | | | | (_| | |
 // |_|  \__,_|_| |_|\__,_|_(_)


const TESTING_API_URL = 'http://localhost:4941/api/v2/';
const PRODUCTION_API_URL = 'http://localhost:4941/api/v2/';




import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VuePaginate from 'vue-paginate'
Vue.use(VuePaginate)


const routes = [
    {
        path:"/",
        component: Home
    },
    {
        path:"/projects",
        component: Projects
    },
    {
        path:"/projects/pledged",
        component: PledgedProjects
    },
    {
        path:"/pledge/:id",
        component: Pledge,
        props:true
    },
    {
        path:"/projects/created",
        component: CreatedProjects
    },
    {
        path:"/projects/create",
        component: CreateProject
    }];

const router = new VueRouter({
    routes: routes,
    mode:'history'
});


import VueResource from 'vue-resource';
Vue.use(VueResource);
// Vue.http.options.emulateJson = true;

new Vue({
    el: '#app',
    data: {'url' : TESTING_API_URL},
    router: router,
    render: h => h(App)
})
