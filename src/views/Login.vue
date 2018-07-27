<template lang="pug">
.full.text-xs-center
	vue-particles( color="#fff" ).part
	v-layout( row align-center justify-center fill-height).login
		v-flex.xs12.sm6.lg4
			v-card
				v-form.rel
					v-avatar(size="64px" @click='next' v-if="active == 0").main
						img( src="@/assets/img/user.svg" )
					v-avatar(size="64px" @click='next' v-if=" active == 1" ).main
						v-icon arrow_back
					transition( name="slideX" mode="out-in" )
						.main( v-if=" active == 0")
							.hello Привет, kmg01!
							v-text-field(  label="Password" required )
							v-checkbox( label="Чужой компьютер" )
							v-layout( row justify-space-between wrap)
								v-btn( flat color="accent" ) Напомнить пароль
								v-btn( flat color="success" ) Вход
					transition( name="slideX" mode="out-in" )
						.user( v-if=" active == 1")
							.hello Выберите учетную запись для входа
							v-layout( row wrap justify-start align-center)
								.userpic.accent.lighten-2( @click="next" )
									v-avatar( size="64px" )
										img( src="@/assets/img/user.svg" )
									.subheading kmg01
								.userpic( @click="next" )
									v-avatar( size="64px" )
										img( src="@/assets/img/user1.svg" )
									.subheading kmg02
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
	height: 100%;
	color: #fff;
	/* background: linear-gradient(#006297, #010B12); */
	background: url(/img/globe-bg.jpg) no-repeat center center;
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

.v-card {
	padding-bottom: 1rem;
	.v-avatar.main {
		transform: translateY(-30px);
		margin-bottom: 0;
		background: #fff;
	}
	.hello {
		font-size: 2rem;
		text-align: left;
		margin-top: 0;
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

</style>
