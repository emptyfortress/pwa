<template lang="pug">
<!-- v&#45;container -->
	<!-- h1 this is folder -->
v-layout( row wrap v-if="$vuetify.breakpoint.lgAndUp")
	v-flex(sm6 xs12)
		v-layout(v-for="n in 10" column)
			v-card(flat router :to="temp")
				h2 Это заголовок документа или задания
	v-flex(sm6 xs12)
		.view
			router-view
</template>

<script>
export default {
	data () {
		return {
			temp: '/section/' + this.$route.params.id + '/detail'

		}
	}
}
</script>

<style scoped lang="scss">
.list {
	/* height: 200px; */
	width: 100%;
	/* background: #fff; */
}
.view {
	height: 200px;
	width: 100%;
	background: #ddd;
}
.v-card {
	min-height: 100px;
	margin-bottom: 1rem;
	h2 {
		font-weight: 400;
	}

}
</style>
