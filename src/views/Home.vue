<template lang="pug">
	v-container( fluid grid-list-sm)
		v-slide-y-transition( mode="out-in" )
			v-layout(row wrap)
				v-flex(v-for="picture in this.$root.cat" xs4 @click="displayDetails(picture['.key'])")
					v-card(tile flat)
						v-card-media(:src="picture.url" height="150")
		footer
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
