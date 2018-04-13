// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import modules from './store/store.js'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(Vuex)
const store = new Vuex.Store({
	state: modules.state,
	getters: modules.getters,
	mutations: modules.mutations
})


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})