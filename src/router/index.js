import VueRouter from 'vue-router';
import Vue from 'vue';

const findComponent = ()=> import('../pages/findComponents/index.vue'); 
const checkBox = ()=>  import('../pages/checkBox/index.vue'); 
const alertTest = ()=> import('../pages/alert/test.vue');
const radioPage = ()=> import('../pages/radio/index.vue');
const displayPage = ()=> import('../pages/display/index.vue');
const tablePafge = ()=> import('../pages/table/table.vue');
const tableSlotPage = ()=> import('../pages/tableSlot/index.vue');
const treePage = ()=> import('../pages/tree/tree.vue');
Vue.use(VueRouter);

const routes = [{
    path:'/findComponent',
    component:findComponent
},{
    path:'/checkBox',
    component:checkBox
},{
    path:'/alertTest',
    component:alertTest
},{
    path:'/radioPage',
    component:radioPage
},{
    path:'/displayPage',
    component:displayPage 
},{
    path:'/tablePage',
    component:tablePafge
},{
    path:'/tableSlotPage',
    component:tableSlotPage
},{
    path:'/treePage',
    component:treePage
}]

const Router = new VueRouter({
    mode:'history',
    routes
})

export default Router;