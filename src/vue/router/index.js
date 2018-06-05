import Vue from 'vue'
import Router from 'vue-router'
import Manage from '../components/Manage.vue'
import Produce from '../components/Produce.vue'
import CustomerService from '../components/CustomerService.vue'
import Pipe from '../components/Pipe.vue'

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
      path: "/pipe",
      name: "pipe",
      component: Pipe,
    }
  ]
});

export default router
