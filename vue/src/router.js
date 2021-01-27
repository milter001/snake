import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes:[
        {
            path:'/',
            name:'home',
            component:Home,
            redirect:'/index',
            children:[
                {
                    path:'/index',
                    name:'index',
                    component:Index,
                }
            ]
        },
        {
            path:'/login',
            name:'login',
            component: ()=> import('./pages/login.vue')
        },
        {
            path:'/register',
            name:'register',
            component: ()=> import('./pages/register.vue')
        }
    ]
});
