import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import * as fire from 'firebase'
import router from './router'
import vuetify from './plugins/vuetify'
import BuyModelComponent from './components/Shared/BuyModel.vue'
import colors from 'vuetify/lib/util/colors'
import './stylus/main.styl'

Vue.use(vuetify)
Vue.config.productionTip = false
Vue.component('app-buy-model', BuyModelComponent)

// export default new Vuetify({
//   theme: {
//     themes: {
//       light: {
//         primary: colors.red.darken1, // #E53935
//         secondary: colors.red.lighten4, // #FFCDD2
//         accent: colors.indigo.base, // #3F51B5
//       },
//     },
//   },
// })

new Vue({
  store,
  router,
  vuetify,
  created(){
    //TODO remove test configs
    fire.initializeApp({
      apiKey: "key",
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


