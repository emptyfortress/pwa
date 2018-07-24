<template lang="pug">
.full.text-xs-center
	<!-- vue&#45;particles( color="#fff" ).part -->
	v-layout( row align-center justify-center fill-height).login
		v-flex.xs12.sm6.lg4
			v-card
				v-form
					v-avatar(size="96px")
						i.icon-user
					v-text-field( v-model="name" :rules="nameRules" label="Name" required ).mt0
					v-text-field( v-model="password"  label="Password" required )
					v-checkbox( v-model="checkbox" label="Чужой компьютер" )
					v-layout( row justify-space-between wrap)
						v-btn( flat color="secondary" ) Напомнить пароль
						v-btn( flat color="primary" ) Вход
</template>

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
.login {
	/* transform: translateY(-100px); */
}

.v-form {
	margin: 0rem 2rem;

}

.v-card {
	/* background: transparent; */
	padding-bottom: 1rem;
	.v-avatar {
		background: #fff;
		transform: translateY(-40px);
		margin-bottom: 0;
	}
	.icon-user {
		font-size: 3rem;
		color: #ccc;
	}
}
.v-input.mt0 {
	margin-top: 0;
}

</style>
