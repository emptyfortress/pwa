<template lang="pug">
.about.text-xs-center
	vue-particles( color="#fff" ).part
	v-layout( row align-center justify-center )
		v-flex.ma-3
			.display-2 Docsvision
			p Комплексная автоматизация управления по отраслям
</template>

<style scoped lang="scss">
h2 {
	color: #fff;
	font-size: 2rem;
}
.about {
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
</style>
