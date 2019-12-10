import Vue from 'vue'
import Toaster from 'v-toaster'
import App from './App.vue'
import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster, {timeout: 2000})

new Vue({
  el: '#app',
  render: h => h(App)
})
