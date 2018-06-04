import Vue from 'vue';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

import './assets/less/base.less'
import './assets/less/common.less'

new Vue({
    el: '#app',
    router,
    render: handler => handler(App)
});
