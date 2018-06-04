import Vue from 'vue'
import Router from 'vue-router'
import Manage from '../components/Manage.vue'
import Produce from '../components/Produce.vue'
import CustomerService from '../components/CustomerService.vue'
import Security from '../components/Security.vue'

Vue.use(Router)

let router = new Router({
  base: '/src/vue',
  mode: "history",
  linkActiveClass: "ON",
  routes: [
    {
      path: "/",
      redirect: "/manage"
    },
    {
      path: "/manage",
      name: "manage",
      component: Manage,
    },
    {
      path: "/produce",
      name: "produce",
      component: Produce,
    },
    {
      path: "/customerService",
      name: "customerService",
      component: CustomerService,
    },
    {
      path: "/security",
      name: "security",
      component: Security,
    }
  ]
});

export default router
