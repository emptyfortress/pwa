<template lang="pug">
.full.text-xs-center
	vue-particles( color="#fff" ).part
	v-layout( row align-center justify-center fill-height).login
		v-flex.xs12.sm6.lg4
			v-card
				v-form
					v-avatar(size="64px" @click=' active = 1')
						img( src="@/assets/img/user.svg" )
					v-tabs(v-model='active')
						div( style="display: none;" )
							v-tab one
							v-tab one
						v-tab-item( :key=1 )
							.hello Привет, kmg01!
							v-text-field(  label="Password" required )
							v-checkbox( label="Чужой компьютер" )
							v-layout( row justify-space-between wrap)
								v-btn( flat color="accent" ) Напомнить пароль
								v-btn( flat color="success" ) Вход
						v-tab-item( :key=2 )
							.hello Привет, kmg02!

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
			// this.active = 2
			// console.log(123)
			const active = parseInt(this.active)
			this.active = (active < 2 ? active + 1 : 0)
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
	/* background: url(/img/globe-bg.jpg) no-repeat center center; */
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
	.v-avatar {
		transform: translateY(-40px);
		margin-bottom: 0;
	}
	.hello {
		font-size: 2rem;
		text-align: left;
		margin-top: 0;
	}
}
.v-input.mt0 {
	margin-top: 0;
}
.v-carousel {
	height: auto;
	box-shadow: none;
}
.v-tabs__bar { display: none; }
.v-tabs__items {
	top: -50px;
}
</style>
