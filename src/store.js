import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
// import firebase from './services/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null
	},
	mutations: {
		setUser (state, payload) {
			state.user = payload
		}
	},
	getters: {
		user (state) {
			return state.user
		}
	},
	actions: {
		logUserIn ({commit}, payload) {
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(
					user => {
						const newUser = {
							id: user.uid
						}
						commit('setUser', newUser)
					}
				)
				.catch(
					error => {
						console.log(error)
					}
				)
		}
	}
})
