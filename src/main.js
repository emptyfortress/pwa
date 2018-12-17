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
import VueDragZone from 'vue-drag-zone'
import VueDragDrop from 'vue-drag-drop'
import VueApexCharts from 'vue-apexcharts'

// import longpress from 'vue-long-press-directive'

// Vue.use(longpress)
Vue.use(Vuefire)
Vue.use(VueResource)
Vue.use(VueParticles)
Vue.use(Trend)
Vue.use(LiquorTree)
Vue.use(VueDragDrop)
Vue.component('Alert', Alert)
Vue.use(VueDragZone)
Vue.use(VueApexCharts)
Vue.config.productionTip = false

Vue.component('apexchart', VueApexCharts)

new Vue({
	router,
	store,
	firebase: {
		// cat: firebase.database.ref('cat').orderByChild('created_at'),
		tree: firebase.database.ref('tree'),
		folders: firebase.database.ref('folders'),
		items: firebase.database.ref('items'),
		users: firebase.database.ref('users'),
		departments: firebase.database.ref('departments')
	},
	render: h => h(App),
	created () {
		this.$store.dispatch('loadTree')
		this.$store.dispatch('loadFolders')
		this.$store.dispatch('loadItems')
		this.$store.dispatch('loadUsers')
		this.$store.dispatch('loadDepartments')
	}
}).$mount('#app')
