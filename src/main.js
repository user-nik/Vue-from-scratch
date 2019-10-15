import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import * as fire from 'firebase'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.use(vuetify)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  created(){
    //TODO remove test configs
    fire.initializeApp({
      apiKey: "AIzaSyD1kKpH7o75dEqhTZi74hKZPcMi5iQj2WY",
      authDomain: "itc-ads-d8ca8.firebaseapp.com",
      databaseURL: "https://itc-ads-d8ca8.firebaseio.com",
      projectId: "itc-ads-d8ca8",
      storageBucket: "itc-ads-d8ca8.appspot.com",
      messagingSenderId: "941891795395",
      appId: "1:941891795395:web:bdd4d966ebc1bc82cba576",
      measurementId: "G-2WKEQSRSM7"
    });
    fire.auth().onAuthStateChanged(user=>{
      if(user){
        this.$store.dispatch('autoLogin', user)
      }
    })
    this.$store.dispatch('fetchAds')
  },
  render: h => h(App),
}).$mount('#app')
