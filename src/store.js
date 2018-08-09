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
		page: '',
		folders: []
	},
	mutations: {
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
		}
	},
	getters: {
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
		}
	}
})
