<template lang="pug">
v-container(grid-list-sm)
	v-layout(row wrap)
		v-flex(v-for="picture in this.$root.cat" :key="picture.id" xs6 sm4 @click="displayDetails(picture['.key'])")
			v-card(tile flat)
				v-card-media(:src="picture.url" height="150")
</template>

<script>
export default {
	data () {
		return {
		}
	},
	methods: {
		displayDetails (id) {
			this.$router.push({name: 'detail', params: { id: id }})
		}
	}
}
</script>

<style scoped lang="scss">

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped> -->
<!-- h1, h2 { -->
<!-- 	font&#45;weight: normal; -->
<!-- } -->
<!-- ul { -->
<!-- 	list&#45;style&#45;type: none; -->
<!-- 	padding: 0; -->
<!-- } -->
<!-- li { -->
<!-- 	display: inline&#45;block; -->
<!-- 	margin: 0 10px; -->
<!-- } -->
<!-- a { -->
<!-- 	color: #42b983; -->
<!-- } -->
<!-- </style> -->
