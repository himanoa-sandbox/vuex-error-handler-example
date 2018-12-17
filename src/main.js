import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Toasted from "vue-toasted"

Vue.config.productionTip = false
Vue.use(Toasted)
Vue.use(Vuex)

const example = {
  namespaced: true,
  actions: {
    async ok(context) {
      console.log("ok")
    },
    async fail(context) {
      throw new Error("エラー");
    }
  }
}
const store = new Vuex.Store({
  modules: {
    example
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
