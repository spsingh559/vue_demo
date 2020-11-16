import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
 

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt'); 
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use(VueAxios, axios)