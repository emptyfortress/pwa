<template lang="pug">
.full.text-xs-center
	vue-particles( color="#fff" ).part
	transition( name="slideX" mode="out-in" )
		v-layout( row v-if="error" )
			v-flex.xs12.sm6.offset-sm3
				Alert( @dismissed="onDismissed" :text="error.message" )

	v-layout( row align-center justify-center fill-height v-if="$vuetify.breakpoint.mdAndUp").login
		v-flex.xs12.sm6.lg4
			v-card
				v-form(@submit.prevent='onEnter').rel
					v-avatar(size="64px" @click='toggleChoosing').main
						img( :src="iconPath()" v-if="!chooseUser" )
						v-icon(v-if="chooseUser") arrow_back
					transition( name="slideX" mode="out-in" )
						.main( v-if="chooseUser == false")
							.hello-big Привет, {{ currentUser.name }}!
							v-text-field(type='password'  label="Password" v-model='password' required )
							v-checkbox( label="Чужой компьютер" )
							v-layout( row justify-space-between wrap)
								v-btn( flat color="accent" @click="onPinEnter") Напомнить пароль
								v-btn( flat color="success" type='submit') Вход
					transition( name="slideX" mode="out-in" )
						.user( v-if="chooseUser == true")
							.hello-big Выберите учетную запись для входа
							v-layout( row wrap justify-start align-center)
								.userpic( @click="next(0)" )
									v-avatar( size="64px" )
										img(:src="require('@/assets/img/user0.svg')" )
									.subheading kmg01
								.userpic( @click="next(1)" )
									v-avatar( size="64px" )
										img(:src="require('@/assets/img/user1.svg')" )
									.subheading kmg02

	v-layout.grid-container(v-if="$vuetify.breakpoint.smAndDown")
		.hello Привет, kmg01!
		.avatar
			v-avatar(size="64px").mob
				img(:src="require('@/assets/img/user0.svg')" )
		.finger
			img(:src="require('@/assets/img/fingerprint.svg')" )
			span Приложите палец, чтобы войти
		.pin
			div( :class='pincode.length >= 1 ? "filled" : "" ' )
			div( :class='pincode.length >= 2 ? "filled" : "" ' )
			div( :class='pincode.length >= 3 ? "filled" : "" ' )
			div( :class='pincode.length >= 4 ? "filled" : "" ' )
		.keyboard
			v-btn( flat dark @click="pin(1)").one 1
			v-btn( flat dark @click="pin(2)").two 2
			v-btn( flat dark @click="pin(3)").three 3
			v-btn( flat dark @click="pin(4)").four 4
			v-btn( flat dark @click="pin(5)").five 5
			v-btn( flat dark @click="pin(6)").six 6
			v-btn( flat dark @click="pin(7)").seven 7
			v-btn( flat dark @click="pin(8)").eight 8
			v-btn( flat dark @click="pin(9)").nine 9
			v-btn( flat dark @click="clearPin").refresh
				v-icon refresh
			v-btn( flat dark @click="pin(0)").zero 0
			v-btn( flat dark @click="slicePin").backspace
				v-icon backspace

</template>

<script>

export default {
	data () {
		return {
			active: 0,
			chooseUser: false,
			email: '',
			password: '',
			pincode: []
		}
	},
	computed: {
		currentUser () {
			if (this.active === 0) {
				return { name: 'kmg01', email: 'kmg01@docsvision.com', password: 'kmg001', pic: 'user0.svg' }
			} else if (this.active === 1) {
				return { name: 'kmg02', email: 'kmg02@docsvision.com', password: 'kmg002', pic: 'user1.svg' }
			}
		},
		error () {
			return this.$store.getters.error
		}
	},
	methods: {
		next (e) {
			this.chooseUser = !this.chooseUser
			this.active = e
		},
		toggleChoosing () {
			this.chooseUser = !this.chooseUser
		},
		onPinEnter () {
			this.$store.dispatch('logUserIn', { email: 'kmg01@docsvision.com', password: 'kmg001' })
			this.$router.push('/')
		},
		onEnter () {
			this.$store.dispatch('logUserIn', { email: this.currentUser.email, password: this.password })
		},
		iconPath () {
			var icon = this.active
			return require('@/assets/img/user' + icon + '.svg')
		},
		pin (e) {
			this.pincode.push(e)
			if (this.pincode[0] === 1 && this.pincode[1] === 2 && this.pincode[2] === 3 && this.pincode[3] === 4) {
				this.onPinEnter()
			}
		},
		clearPin () {
			this.pincode = []
		},
		slicePin () {
			this.pincode.splice(-1, 1)
		},
		onDismissed () {
			this.$store.dispatch('clearError')
		}
	}
}
</script>

<style scoped lang="scss">

h2 {
	color: #fff;
	font-size: 2rem;
}
.full {
	position: relative;
	height: 100vh;
	overflow: hidden;
	color: #fff;
	/* background: linear-gradient(#006297, #010B12); */
	background: url(/img/globe-bg.jpg) no-repeat 10% 40%;
	/* background: -moz-linear-gradient(top, #010b12 0%, #2989d8 29%, #006297 47%, #006297 47%, #010b12 100%); */
	/* background: -webkit-linear-gradient(top, #010b12 0%,#2989d8 29%,#006297 47%,#006297 47%,#010b12 100%); */
	/* background: linear-gradient(to bottom, #010b12 0%,#2989d8 29%,#006297 47%,#006297 47%,#010b12 100%); */
}
.part {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.v-form {
	margin: 0rem 2rem;
}

.hello-big {
	font-size: 2rem;
	text-align: left;
	margin-top: 0;
}
.v-card {
	padding-bottom: 1rem;
	.v-avatar.main {
		transform: translateY(-30px);
		margin-bottom: 0;
		background: #fff;
	}
	min-height: 300px;
}
.v-input.mt0 {
	margin-top: 0;
}
.v-avatar {
	cursor: pointer;
	.v-icon {
		font-size: 2.5rem;
	}
}
.userpic {
	cursor: pointer;
	margin-right: 1rem;
	margin-top: 1rem;
	padding: .5rem;
	border-radius: 10px;
	.v-avatar { background: #eee; }
}
.mob {
	background: #001F44;
	border: 2px solid #fff;
	margin-bottom: 1rem;
}

.grid-container {
	display: grid;
	height: 100%;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: auto;
	grid-template-areas: "hello hello hello" "avatar avatar avatar" "finger finger finger" "pin pin pin" "keyboard keyboard keyboard";
}

.hello {
	grid-area: hello;
	font-size: 1.5rem;
	padding: 1rem;
}

.avatar {
	grid-area: avatar;
}

.finger {
	grid-area: finger;
	background: #00000044;
	width: 100%;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		height: 32px;
		margin-right: 1rem;
	}
}

.pin {
	grid-area: pin;
	display: flex;
	justify-content: center;
	align-items: center;
	div {
		width: 1rem;
		height: 1rem;
		background: #000;
		margin: 0 .5rem;
		border-radius: 1rem;
		&.filled {
			background: #00ff00;
		}
	}
}

.keyboard {
	display: grid;
	grid-area: keyboard;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
	grid-template-areas: "one two three" "four five six" "seven eight nine" "refresh zero backspace";
	.v-btn {
		padding: 0;
		height: 100%;
		font-size: 3rem;
		border-radius: 1rem;
	}
}

.one { grid-area: one; }
.two { grid-area: two; }
.three { grid-area: three; }
.four { grid-area: four; }
.five { grid-area: five; }
.six { grid-area: six; }
.seven { grid-area: seven; }
.eight { grid-area: eight; }
.nine { grid-area: nine; }
.zero { grid-area: zero; }

</style>
