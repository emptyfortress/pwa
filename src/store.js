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
		items: [],
		filter: '',
		tile: false
	},
	mutations: {
		setCurrentFolder (state, payload) { state.currentFolder = payload },
		setUser (state, payload) { state.user = payload },
		setLoading (state, payload) { state.loading = payload },
		setError (state, payload) { state.error = payload },
		clearError (state) { state.error = null },
		setTree (state, payload) { state.tree = payload },
		setItems (state, payload) { state.items = payload },
		toggleTile (state) {
			if (state.tile === false) {
				state.tile = true
			} else state.tile = false
		},
		setFilter (state, payload) {
			state.filter = payload
		},
		updateItem (state, payload) {
			const item = state.items.find(item => {
				return item.id === payload.id
			})
			item.unread = payload.unread
		},
		updateFolder (state, payload) {
			const folder = state.tree.find(folder => {
				return folder.id === payload.id
			})
			// console.log(folder)
			folder.data.filter = payload.filter
		}
	},

	getters: {
		tile (state) { return state.tile },
		currentFolder (state) { return state.currentFolder },
		user (state) { return state.user },
		loading (state) { return state.loading },
		error (state) { return state.error },
		tree (state) { return state.tree },
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
		filter (state) {
			return state.filter
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
		filterRec (currentItems, condition, result) { // recursive function for flatten
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
							folder: obj[key].folder,
							author: obj[key].author,
							descr: obj[key].descr,
							files: obj[key].files,
							focus: obj[key].focus,
							unread: obj[key].unread,
							attach: obj[key].attach
						})
					}
					commit('setItems', items)
					commit('setLoading', false)
				})
				.catch((error) => {
					console.log(error)
					commit('setLoading', false)
				})
		},
		updateItemReadStatus ({commit}, payload) {
			const updateObject = {}
			updateObject.unread = payload.unread
			firebase.database().ref('items').child(payload.id).update(updateObject)
				.then(() => {
					commit('updateItem', payload)
				})
				.catch(error => {
					console.log(error)
				})
		},
		updateFolderFilter ({commit}, payload) {
			const updateObject = {}
			updateObject.filter = payload.filter
			var tree = firebase.database().ref('tree')
			tree.orderByChild('id').equalTo('my-doc').on('value', function (snapshot) {
				let ob = snapshot.val()
				console.log(Object.keys(ob))
				console.log(snapshot.key)
			})
			// tree.once('tasks')
			// 	.then(function (snapshot) {
			// 		var key = snapshot.key
			// 		console.log(key)
			// 	})
			// let myId = firebase.database().ref('tree').orderByChild('id').equalTo('my-doc').on('value', function (snapshot) {
			// 	console.log(snapshot.key)
			// })
			// var folder = tree.ref
			// var folder = tree.ref('1')
			// var folder = tree.parent('tasks')
			// console.log(folder)
			// var data = folder.child('data')
			// data.update(updateObject)
			// 	.then(() => {
			// 		commit('updateFolder', payload)
			// 	})
			// 	.catch(error => {
			// 		console.log(error)
			// 	})
		}
	}
})
