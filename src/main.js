import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import Vuefire from 'vuefire'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/css/support.css'
import '@/assets/css/main.scss'
import firebase from './services/firebase'
import VueResource from 'vue-resource'
import VueParticles from 'vue-particles'
import Trend from 'vuetrend'
import LiquorTree from 'liquor-tree'
import Alert from './components/Alert'

Vue.use(Vuefire)
Vue.use(VueResource)
Vue.use(VueParticles)
Vue.use(Trend)
Vue.use(LiquorTree)
Vue.component('Alert', Alert)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	firebase: {
		cat: firebase.database.ref('cat').orderByChild('created_at'),
		tree: firebase.database.ref('tree'),
		items: firebase.database.ref('items')
	},
	render: h => h(App),
	created () {
		this.$store.dispatch('loadTree')
		this.$store.dispatch('loadItems')
	}
}).$mount('#app')
