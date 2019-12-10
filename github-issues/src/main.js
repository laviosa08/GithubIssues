//Importing required library files.
import Vue from 'vue'
import Toaster from 'v-toaster'
import App from './App.vue'
import 'v-toaster/dist/v-toaster.css'

//To use toaster globaly for 2 seconds across all files
Vue.use(Toaster, {timeout: 2000})

//rendering vue instance to app.
new Vue({
  el: '#app',
  render: h => h(App)
})
