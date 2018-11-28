import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
// import firebase from './services/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		night: false,
		user: null,
		loading: false,
		error: null,
		view: 'tile',
		currentFolder: '',
		filter: '',
		folders: [],
		tree: [],
		departments: [],
		items: [],
		users: [],
		headers: [],
		addTask: false,
		selected: false,
		min: false,
		slot0: [],
		restore: false,
		duration: 3,
		hours: false
	},
	mutations: {
		setCurrentFolder (state, payload) { state.currentFolder = payload },
		setUser (state, payload) { state.user = payload },
		setLoading (state, payload) { state.loading = payload },
		setError (state, payload) { state.error = payload },
		clearError (state) { state.error = null },
		setTree (state, payload) { state.tree = payload },
		setDepartments (state, payload) { state.departments = payload },
		setFolders (state, payload) { state.folders = payload },
		setItems (state, payload) { state.items = payload },
		setUsers (state, payload) { state.users = payload },
		setSelected (state, payload) { state.selected = payload },
		toggleMin (state) { state.min = !state.min },
		closeMin (state) { state.min = false },
		setSlot0 (state, payload) { state.slot0 = payload },
		setDuration (state, payload) { state.duration = payload },
		durationUp (state) { state.duration++ },
		durationDown (state) { state.duration-- },
		toggleHours (state) { state.hours = !state.hours },
		toggleTheme (state) {
			if (state.night === false) {
				state.night = true
			} else state.night = false
		},
		toggleView (state, payload) { state.view = payload },
		toggleAddTask (state) { state.addTask = !state.addTask },
		setRestore (state) { state.restore = true },
		unsetRestore (state) { state.restore = false },
		closeAddTask (state) { state.addTask = false },
		setFilter (state, payload) { state.filter = payload },
		updateItem (state, payload) {
			const item = state.items.find(item => {
				return item.id === payload.id
			})
			item.unread = payload.unread
		},
		updateFolder (state, payload) {
			const folder = state.folders.find(folder => {
				return folder.id === payload.id
			})
			folder.filter = payload.filter
		}
	},

	getters: {
		restore (state) { return state.restore },
		theme (state) { return state.night },
		view (state) { return state.view },
		currentFolder (state) { return state.currentFolder },
		user (state) { return state.user },
		loading (state) { return state.loading },
		error (state) { return state.error },
		tree (state) { return state.tree },
		departments (state) { return state.departments },
		folders (state) { return state.folders },
		items (state) { return state.items },
		users (state) { return state.users },
		headers (state) { return state.headers },
		filter (state) { return state.filter },
		selected (state) { return state.selected },
		addTask (state) { return state.addTask },
		min (state) { return state.min },
		slot0 (state) { return state.slot0 },
		duration (state) { return state.duration },
		hours (state) { return state.hours },
		currentItem (state) {
			return (itemId) => {
				return state.items.find(item => {
					return item.id === itemId
				})
			}
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
		loadDepartments ({commit}) {
			commit('setLoading', true)
			firebase.database().ref('departments').once('value')
				.then((data) => {
					const departments = []
					const obj = data.val()

					for (let key in obj) {
						departments.push({
							id: obj[key].id,
							text: obj[key].text,
							img: obj[key].img,
							children: obj[key].children,
							data: obj[key].data
						})
					}
					commit('setDepartments', departments)
					commit('setLoading', false)
				})
				.catch((error) => {
					console.log(error)
					commit('setLoading', false)
				})
		},
		loadFolders ({commit}) {
			commit('setLoading', true)
			firebase.database().ref('folders').once('value')
				.then((data) => {
					const folders = []
					const obj = data.val()

					for (let key in obj) {
						folders.push({
							id: obj[key].id,
							text: obj[key].text,
							path: obj[key].path,
							type: obj[key].type,
							items: obj[key].items,
							unread: obj[key].unread,
							filter: obj[key].filter,
							overdue: obj[key].overdue,
							history: obj[key].history,
							dash: obj[key].dash
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
							folder: obj[key].folder,
							author: obj[key].author,
							descr: obj[key].descr,
							files: obj[key].files,
							focus: obj[key].focus,
							unread: obj[key].unread,
							created: obj[key].created,
							modified: obj[key].modified,
							deadline: obj[key].deadline,
							executor: obj[key].executor,
							filenames: obj[key].filenames,
							selected: false
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
		loadUsers ({commit}) {
			commit('setLoading', true)
			firebase.database().ref('users').once('value')
				.then((data) => {
					const users = []
					const obj = data.val()

					for (let key in obj) {
						users.push({
							id: obj[key].id,
							img: obj[key].img,
							name: obj[key].name,
							class: obj[key].class
						})
					}
					commit('setUsers', users)
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
			updateObject.id = payload.id
			updateObject.filter = payload.filter
			firebase.database().ref('folders').child(payload.id).update(updateObject)
				.then(() => {
					commit('updateFolder', payload)
				})
				.catch(error => {
					console.log(error)
				})
		},
		clearUnreadStatus () {
			const updateObject = {}
			updateObject.unread = ''
		}
	}
})
