import Vue from 'vue'
import App from './App.vue'
import Projects from './Projects.vue'
import PledgedProjects from './PledgedProjects.vue'
import CreatedProjects from './CreatedProjects.vue'
import CreateProject from './CreateProject.vue'


import VueRouter from 'vue-router';
Vue.use(VueRouter);


const routes = [
    {
        path:"/",
        component: Projects
    },
    {
        path:"/projects/pledged",
        component: PledgedProjects
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
Vue.http.options.emulateJson = true;

Window.user = null;

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})