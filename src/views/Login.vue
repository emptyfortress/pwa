<template lang="pug">
.full.text-xs-center
	<!-- vue&#45;particles( color="#fff" ).part -->

	v-layout( row align-center justify-center fill-height v-if="$vuetify.breakpoint.mdAndUp").login
		v-flex.xs12.sm6.lg4
			v-card
				v-form.rel
					v-avatar(size="64px" @click='next' v-if="active == 0").main
						img( src="@/assets/img/user.svg" )
					v-avatar(size="64px" @click='next' v-if=" active == 1" ).main
						v-icon arrow_back
					transition( name="slideX" mode="out-in" )
						.main( v-if=" active == 0")
							.hello-big Привет, kmg01!
							v-text-field(  label="Password" required )
							v-checkbox( label="Чужой компьютер" )
							v-layout( row justify-space-between wrap)
								v-btn( flat color="accent" ) Напомнить пароль
								v-btn( flat color="success" ) Вход
					transition( name="slideX" mode="out-in" )
						.user( v-if=" active == 1")
							.hello-big Выберите учетную запись для входа
							v-layout( row wrap justify-start align-center)
								.userpic.accent.lighten-2( @click="next" )
									v-avatar( size="64px" )
										img( src="@/assets/img/user.svg" )
									.subheading kmg01
								.userpic( @click="next" )
									v-avatar( size="64px" )
										img( src="@/assets/img/user1.svg" )
									.subheading kmg02

	v-layout.grid-container(v-if="$vuetify.breakpoint.smAndDown")
		.hello Привет, kmg01!
		.avatar
			v-avatar(size="64px" @click='next' v-if="active == 0").mob
				img( src="@/assets/img/user.svg" )
		.finger
			img( src="@/assets/img/fingerprint.svg" )
			span Приложите палец, чтобы войти
		.pin
			#1
			#2
			#3
			#4
		.keyboard
			v-btn( flat dark ).one 1
			v-btn( flat dark ).two 2
			v-btn( flat dark ).three 3
			v-btn( flat dark ).four 4
			v-btn( flat dark ).five 5
			v-btn( flat dark ).six 6
			v-btn( flat dark ).seven 7
			v-btn( flat dark ).eight 8
			v-btn( flat dark ).nine 9
			v-btn( flat dark ).zero 0

</template>

<script>
export default {
	data () {
		return {
			active: 0
		}
	},
	methods: {
		next () {
			this.active === 0 ? this.active = 1 : this.active = 0
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
	/* margin: 0; */
	/* padding: 0; */
	height: 100%;
	color: #fff;
	background: linear-gradient(#006297, #010B12);
	/* background: url(/img/globe-bg.jpg) no-repeat 10% 40%; */
	/* background: -moz-linear-gradient(top, #010b12 0%, #2989d8 29%, #006297 47%, #006297 47%, #010b12 100%); */
	/* background: -webkit-linear-gradient(top, #010b12 0%,#2989d8 29%,#006297 47%,#006297 47%,#010b12 100%); */
	/* background: linear-gradient(to bottom, #010b12 0%,#2989d8 29%,#006297 47%,#006297 47%,#010b12 100%); */
}
.part {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh
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
	&:hover {
		background: #eee;
	}
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
	/* grid-template-rows: .8fr 1fr 48px 1fr 3fr; */
	grid-template-rows: auto;
	grid-template-areas: "hello hello hello" "avatar avatar avatar" "finger finger finger" "pin pin pin" "keyboard keyboard keyboard";
}

.hello {
	grid-area: hello;
	font-size: 1.5rem;
	padding: 1rem;
	/* margin-top: 1rem; */
	border: 1px solid red;
}

.avatar {
	grid-area: avatar;
	border: 1px solid red;
}

.finger {
	grid-area: finger;
	border: 1px solid red;
	background: #000000aa;
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
	}
}

.keyboard {
	display: grid;
	grid-area: keyboard;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
	grid-template-areas: "one two three" "four five six" "seven eight nine" ". zero .";
	.v-btn {
		padding: 0;
		/* background: #000000aa; */
		height: 100%;
		font-size: 3rem;
		border: 1px solid red;
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
