import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import Vuefire from 'vuefire'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/css/support.css'
import firebase from './services/firebase'
import VueResource from 'vue-resource'

Vue.use(Vuefire)
Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	firebase: {
		cat: firebase.database.ref('cat').orderByChild('created_at')
	},
	render: h => h(App)
}).$mount('#app')
