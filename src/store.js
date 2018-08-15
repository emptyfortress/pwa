import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
// import firebase from './services/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		loading: false,
		error: null,
		currentFolder: '',
		currentItem: '',
		folders: [],
		items: []
	},
	mutations: {
		setCurrentFolder (state, payload) {
			state.currentFolder = payload
		},
		setCurrentItem (state, payload) {
			state.currentItem = payload
		},
		setUser (state, payload) {
			state.user = payload
		},
		setLoading (state, payload) {
			state.loading = payload
		},
		setError (state, payload) {
			state.error = payload
		},
		clearError (state) {
			state.error = null
		},
		setFolders (state, payload) {
			state.folders = payload
		},
		setItems (state, payload) {
			state.items = payload
		}
	},
	getters: {
		currentFolder (state) {
			return state.currentFolder
		},
		currentItem (state) {
			return state.currentItem
		},
		user (state) {
			return state.user
		},
		loading (state) {
			return state.loading
		},
		error (state) {
			return state.error
		},
		folders (state) {
			return state.folders
		},
		items (state) {
			return state.items
		}
	},
	actions: {
		logUserIn ({commit}, payload) {
			commit('setLoading', true)
			commit('clearError')
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(
					user => {
						commit('setLoading', false)
						const newUser = {
							id: user.uid
						}
						commit('setUser', newUser)
					}
				)
				.catch(
					error => {
						commit('setLoading', false)
						commit('setError', error)
						console.log(error)
					}
				)
		},
		clearError ({commit}) {
			commit('clearError')
		},
		loadFolders ({commit}) {
			commit('setLoading', true)
			firebase.database().ref('folders').once('value')
				.then((data1) => {
					const folders = []
					const obj = data1.val()

					for (let key in obj) {
						folders.push({
							id: obj[key].id,
							text: obj[key].text,
							state: obj[key].state,
							children: obj[key].children,
							data: obj[key].data
						})
					}
					commit('setFolders', folders)
					commit('setLoading', false)
				})
				.catch((error) => {
					console.log(error)
					commit('setLoading', false)
				})
		},
		loadItems ({commit}) {
			commit('setLoading', true)
			firebase.database().ref('items').once('value')
				.then((data) => {
					const items = []
					const obj = data.val()

					for (let key in obj) {
						items.push({
							id: obj[key].id,
							title: obj[key].title,
							num: obj[key].num
						})
					}
					commit('setItems', items)
					commit('setLoading', false)
				})
				.catch((error) => {
					console.log(error)
					commit('setLoading', false)
				})
		}
	}
})
