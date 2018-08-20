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
		tree: [],
		items: []
	},
	mutations: {
		setCurrentFolder (state, payload) {
			state.currentFolder = payload
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
		setTree (state, payload) {
			state.tree = payload
		},
		setItems (state, payload) {
			state.items = payload
		}
	},

	getters: {
		currentFolder (state) {
			return state.currentFolder
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
		tree (state) {
			return state.tree
		},
		folderList (state, getters) { // this is flat list of all folders - for home page
			let result = []
			let tree = getters.tree
			function fil (currentItems, result) {
				for (let item of currentItems) {
					result.push(item)
					if (item.children) { fil(item.children, result) }
				}
				return result
			}
			fil(tree, result)
			return result
		},
		items (state) {
			return state.items
		},
		currentItem (state) {
			return (itemId) => {
				return state.items.find(item => {
					return item.id === itemId
				})
			}
		}
	},

	actions: {
		filterRec (currentItems, condition, result) {
			for (let item of currentItems) {
				if (condition(item)) {
					result.push(item)
				}
				if (item.children) {
					this.filterRec(item.children, condition, result)
				}
			}
		},
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
		loadTree ({commit}) {
			commit('setLoading', true)
			firebase.database().ref('tree').once('value')
				.then((data1) => {
					const tree = []
					const obj = data1.val()

					for (let key in obj) {
						tree.push({
							id: obj[key].id,
							text: obj[key].text,
							state: obj[key].state,
							children: obj[key].children,
							data: obj[key].data
						})
					}
					commit('setTree', tree)
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
