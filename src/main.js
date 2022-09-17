import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import Alert from './components/alert/alert.js'
Vue.config.productionTip = false
Vue.prototype.$Alert = Alert;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
