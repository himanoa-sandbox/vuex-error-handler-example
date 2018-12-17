import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Toasted from "vue-toasted"

Vue.config.productionTip = false
Vue.use(Toasted) // トーストを出すためのライブラリ
Vue.use(Vuex)

function isActionsObj(actions) {
  return typeof actions === 'object' && Object.values(actions).filter(action => typeof action !== 'function').length == 0
}

async function errorHandler(err) {
  Vue.toasted.show(err.message, {
    position: "top-center"
  })
  throw err;
}

function enhanceErrorHandler(actions) {
  if(!isActionsObj(actions)) throw new Error("vuexのaction形式のオブジェクトが渡されていません")
  return Object.entries(actions).reduce((acc, [actionName, action]) => {
    return { ...acc, ...{[actionName]: (context, args) => action(context, args).catch(errorHandler)}}
  }, {})
}

const actions = {
  async ok(context) {
    console.log("ok")
  },
  async fail(context) {
    throw new Error("エラー");
  }
}
const example = {
  namespaced: true,
  actions: enhanceErrorHandler(actions)
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
