import firebase from 'firebase'

var config = {
	apiKey: 'AIzaSyCl0StpFGLqAb8JRcZdMKUowq49y-J-ml0',
	authDomain: 'docsvision-8d5eb.firebaseapp.com',
	databaseURL: 'https://docsvision-8d5eb.firebaseio.com',
	projectId: 'docsvision-8d5eb',
	storageBucket: 'docsvision-8d5eb.appspot.com',
	messagingSenderId: '506543073187'
}

firebase.initializeApp(config)

export default {
	database: firebase.database()
}
